import { useEffect, useState } from 'react';
import { ConditionGraph } from "./condition-graph";
import { css } from "@emotion/css";
import { Diary, DiaryNoData, Symptom } from '../types';
import { GraphControlConditionList } from './graph-control-condition-list';
import { GraphControlSymptomList } from './graph-control-symptom-list';

interface Props {
  diaries: (Diary | DiaryNoData)[];
  symptoms: Symptom[];
}

export const GraphView = (props: Props) => {
  const [ displayCondition, setDisplayCondition ] = useState(true);
  const [ displaySymptoms, setDisplaySymptoms ] = useState(new Map<number, boolean>());

  useEffect(() => {
    const displaySymptoms = new Map<number, boolean>();

    props.diaries.forEach(diary => {
      if (!('id' in diary)) {
        return;
      }

      diary.symptoms.forEach((s, i) => {
        displaySymptoms.set(s.symptomId, i === 0);
      });
    });

    setDisplaySymptoms(displaySymptoms);
  }, [props.diaries]);

  return (
    <main className={mainStyle}>
      <ConditionGraph diaries={props.diaries} displaySymptoms={displaySymptoms} symptoms={props.symptoms} displayCondition={displayCondition} />
      <GraphControlConditionList diaries={props.diaries} displayCondition={displayCondition} onCheckChanged={checked => setDisplayCondition(checked)} />
      <GraphControlSymptomList diaries={props.diaries} symptoms={props.symptoms} displaySymptoms={displaySymptoms} onDisplaySymptomsChanged={symptoms => setDisplaySymptoms(symptoms)} />
    </main>
  );
};

const mainStyle = css`
  padding: 1.6rem;
`;
