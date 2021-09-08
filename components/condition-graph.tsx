import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { Diary, DiaryNoData, Symptom } from '../types';
import { getColor } from '../services/color.service';
import { css } from '@emotion/css';

interface Props {
  diaries: (Diary | DiaryNoData)[];
  displayCondition: boolean;
  displaySymptoms: Map<number, boolean>;
  symptoms: Symptom[];
}

export const ConditionGraph: React.VFC<Props> = props => {
  const labels: string[] = [];
  const conditionData: (number | null)[] = [];
  const symptomsData = new Map<number, number[]>();
  const symptomMap = new Map<number, Symptom>();

  props.symptoms.forEach(symptom => {
    symptomMap.set(symptom.id, symptom);
  });

  props.diaries.forEach(diary => {
    if (!('id' in diary)) {
      return;
    }

    diary.symptoms.forEach(symptom => {
      if (!symptomsData.has(symptom.symptomId)) {
        symptomsData.set(symptom.symptomId, []);
      }
    });
  });

  props.diaries.forEach(diary => {
    labels.push(String(diary.date.day));

    const diarySymptoms = new Map<number, number>();

    if ('id' in diary) {
      conditionData.push(diary.condition);

      diary.symptoms.forEach(symptom => {
        diarySymptoms.set(symptom.symptomId, symptom.level);
      });

      Array.from(symptomsData.entries()).forEach(([id, data]) => {
        const diarySymptom = diarySymptoms.get(id);
        if (diarySymptom) {
          data.push(diarySymptom);
        } else {
          data.push(0);
        }

        symptomsData.set(id, data);
      });

    } else {
      conditionData.push(null);

      Array.from(symptomsData.entries()).forEach(([id, data]) => {
        data.push(0);
        symptomsData.set(id, data);
      });
    }
  });

  const datasets: ChartDataset[] = [];

  if (props.displayCondition) {
    datasets.push({
      label: 'コンディション',
      type: 'line',
      data: conditionData,
      fill: false,
      borderColor: getColor('grey')['800'],
      yAxisID: 'condition',
    });
  }

  Array.from(symptomsData.entries()).forEach(([id, data]) => {
    const symptom = symptomMap.get(id);
    if (!symptom || props.displaySymptoms.get(symptom.id) !== true) {
      return;
    }

    datasets.push({
      label: symptom.name,
      type: 'bar',
      data,
      backgroundColor: getColor(symptom.color)['800'],
      yAxisID: 'symptom',
    });
  });

  const data: ChartData = {
    labels,
    datasets,
  };

  const options: ChartOptions = {
    scales: {
      'condition': {
        position: 'left',
        min: -100,
        max: 100,
      },
      'symptom': {
        position: 'right',
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className={containerStyle}>
      <Line data={data as any} options={options as any} />
    </div>
  );
};

const containerStyle = css`
  margin-bottom: 4rem;
`;
