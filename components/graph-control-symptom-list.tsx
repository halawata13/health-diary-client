import React from 'react';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { blue } from "@material-ui/core/colors";
import { IoEyeOutline } from "react-icons/io5";
import { Diary, DiaryNoData, Symptom } from '../types';
import { getColor } from '../services/color.service';

interface Props {
  diaries: (Diary | DiaryNoData)[];
  symptoms: Symptom[];
  displaySymptoms: Map<number, boolean>;
  onDisplaySymptomsChanged: (displaySymptoms: Map<number, boolean>) => void;
}

interface SymptomItem {
  id: number;
  max: number;
  count: number;
}

export const GraphControlSymptomList: React.VFC<Props> = props => {
  const symptomMap = new Map<number, Symptom>();
  props.symptoms.forEach(symptom => {
    symptomMap.set(symptom.id, symptom);
  });

  const diarySymptoms = new Map<number, SymptomItem>();

  props.diaries.forEach(diary => {
    if (!('id' in diary)) {
      return;
    }

    diary.symptoms.forEach(s => {
      const symptom = diarySymptoms.get(s.symptomId);

      if (symptom) {
        diarySymptoms.set(s.symptomId, {
          id: s.symptomId,
          max: symptom.max > s.level ? symptom.max : s.level,
          count: symptom.count + 1,
        });
      } else {
        diarySymptoms.set(s.symptomId, {
          id: s.symptomId,
          max: s.level,
          count: 1,
        });
      }
    });
  });

  const symptoms = Array.from(diarySymptoms.values()).sort((a, b) => {
    return a.count === a.count ? a.max < b.max ? 1 : -1 : a.count < b.count ? 1 : -1;
  });

  const onItemClicked = (symptom: SymptomItem) => {
    const display = props.displaySymptoms.get(symptom.id);
    if (display != null) {
      props.displaySymptoms.set(symptom.id, !display);
      props.onDisplaySymptomsChanged(new Map(props.displaySymptoms));
    }
  };

  return (
    <>
      {symptoms.length > 0 && (
        <div className={headerStyle}>
          <div className={headerLabelStyle}>日数</div>
          <div className={headerLabelStyle}>最大値</div>
        </div>
      )}
      {symptoms.map(symptom => {
        const display = props.displaySymptoms.get(symptom.id) ?? false;
        const listColor = getColor(symptomMap.get(symptom.id)?.color ?? 'grey')['50'];
        const checkColor = getColor(symptomMap.get(symptom.id)?.color ?? 'grey')['800'];

        return (
          <div key={symptom.id} className={[listStyle, display ? '-checked' : ''].join(' ')} onClick={() => onItemClicked(symptom)}
               style={display ? {
                 backgroundColor: listColor,
                 borderColor: listColor,
               } : {}}>
            <div className={checkStyle}
                 style={display ? {
                   backgroundColor: checkColor,
                   borderColor: checkColor,
                 } : {}}>
              <IoEyeOutline className={checkIconStyle} />
            </div>
            <div className={labelStyle}>{symptomMap.get(symptom.id)?.name}</div>
            <div className={valueStyle}>{symptom.count}日</div>
            <div className={valueStyle}>{symptom.max}</div>
          </div>
        );
      })}
    </>
  );
};

const headerStyle = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.8rem 1.6rem;
  border: solid 1px transparent;
  font-size: 1.4rem;
`;

const headerLabelStyle = css`
  width: 10rem;
  text-align: center;
`;

const listStyle = css`
  display: flex;
  align-items: center;
  min-height: 4.4rem;
  margin-bottom: 0.8rem;
  padding: 0.4rem 1.6rem;
  border: solid 1px ${variables.colorBorder};
  border-radius: 1rem;
  font-size: 1.4rem;

  &.-checked {
    border-color: initial;
    background-color: initial;
  }
`;

const checkStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1.6rem;
  border: solid 1px ${variables.colorBorder};
  border-radius: 10rem;

  .-checked & {
    border-color: ${blue["800"]};
    background-color: ${blue["800"]};
    color: #fff;
  }
`;

const checkIconStyle = css`
  display: none;
  font-size: 1.1rem;

  .-checked & {
    display: initial;
  }
`;

const labelStyle = css`
  flex-grow: 1;
`;

const valueStyle = css`
  width: 10rem;
  text-align: center;
`;
