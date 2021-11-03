import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { blue, grey, red } from "@material-ui/core/colors";
import { useSetRecoilState } from "recoil";
import { diaryFormModalState } from "../states/diary-form-modal.state";
import { Diary, DiaryNoData } from "../types";
import { dateState } from '../states/date.state';
import { getColor } from '../services/color.service';

interface Props {
  diary: Diary | DiaryNoData;
}

export const ConditionListItem = (props: Props) => {
  const setDate = useSetRecoilState(dateState);
  const setDiaryFromModalState = useSetRecoilState(diaryFormModalState);

  const onItemClicked = (diary: Diary | DiaryNoData) => {
    const params = 'id' in diary ? {
      condition: diary.condition,
    } : undefined;

    setDate(diary.date);
    setDiaryFromModalState({
      show: true,
      params: params,
      diary: 'id' in diary ? diary : undefined,
    });
  };

  const backgroundClass = (() => {
    if (!('id' in props.diary)) {
      return '';
    }

    if (props.diary.condition <= -50) {
      return '-so-bad';
    }
    if (props.diary.condition < 0) {
      return '-bad';
    }
    if (props.diary.condition >= 50) {
      return '-so-good';
    }
    if (props.diary.condition > 0) {
      return '-good';
    }
    return '';
  })();

  return (
    <li className={[itemStyle, backgroundClass].join(' ')} onClick={() => onItemClicked(props.diary)}>
      <div className={infoStyle}>
        <div className={[dateStyle, props.diary.date.weekday === 6 ? '-sat' : '', props.diary.date.weekday === 7 ? '-sun': ''].join(' ')}>{props.diary.date.day}</div>
        <div className={dateInfoStyle}>
          <span className={weekStyle}>{props.diary.date.weekdayShort}</span>
        </div>
      </div>
      {'id' in props.diary ? (
        <>
          <div className={conditionStyle}>{props.diary.condition}</div>
          <div className={symptomListStyle}>
            {props.diary.symptoms
              .concat()
              .sort(((a, b) => a.level === b.level ? 0 : a.level < b.level ? 1 : -1))
              .map(symptom => (
                <dl className={symptomListItemStyle} key={symptom.id}>
                  <dt className={symptomLabelStyle}>{symptom.symptom.name}</dt>
                  <dd className={symptomValueStyle} style={{
                    backgroundColor: getColor(symptom.symptom.color)?.['800']
                  }}>{symptom.level}</dd>
                </dl>
              ))}
          </div>
        </>
      ) : (
        <div className={placeholderStyle}>タップして体調を入力...</div>
      )}
    </li>
  );
};

const itemStyle = css`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  border-bottom: solid 1px ${variables.colorBorder};
  color: ${variables.colorTextDark};
  
  &:first-child {
    border-radius: 0.8rem 0.8rem 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 0.8rem 0.8rem;
    border-bottom: none;
  }
  
  &.-so-good {
    background-color: ${blue["100"]};
  }
  
  &.-good {
    background-color: ${blue["50"]};
  }
  
  &.-bad {
    background-color: ${red["50"]};
  }
  
  &.-so-bad {
    background-color: ${red["100"]};
  }

  &.-so-good,
  &.-good,
  &.-bad,
  &.-so-bad {
    border-bottom-color: #fff;
  }
`;

const infoStyle = css`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  width: 10rem;
  margin-right: 1.6rem;
  border-right: solid 1px ${variables.colorBorder};

  .-so-good &,
  .-good &,
  .-bad &,
  .-so-bad & {
    border-right-color: #fff;
  }
`;

const dateStyle = css`
  width: 5rem;
  margin-right: 0.4rem;
  text-align: center;
  font-size: 3.6rem;
  font-weight: 300;
  
  &.-sat {
    color: ${blue['800']};
  }
  
  &.-sun {
    color: ${red['800']};
  }
`;

const dateInfoStyle = css`
  display: flex;
  flex-direction: column;
  padding-right: 1.6rem;
  font-size: 1.4rem;
  font-weight: 100;
  line-height: 1;
`;

const weekStyle = css`
  color: ${variables.colorTextLight};
`;

const conditionStyle = css`
  flex: 0 0 auto;
  width: 5rem;
  margin-right: 2.4rem;
  text-align: right;
  font-size: 2rem;
`;

const symptomListStyle = css`
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.8rem;
`;

const symptomListItemStyle = css`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-right: 1.6rem;
  font-size: 1.4rem;
`;

const symptomLabelStyle = css`
  line-height: 1;
  color: ${variables.colorTextLight};
`;

const symptomValueStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 0.4rem;
  border-radius: 5px;
  background-color: ${grey["800"]};
  color: #fff;
`;

const placeholderStyle = css`
  font-size: 1.4rem;
  color: ${variables.colorTextLight};
`;
