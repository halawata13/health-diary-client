import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { css } from '@emotion/css';
import { Bar } from 'react-chartjs-2';
import { SymptomWithDiarySymptoms } from '../types';
import { DateTime } from 'luxon';
import { getColor } from '../services/color.service';

interface Props {
  symptom: SymptomWithDiarySymptoms;
}

export const SymptomGraphAll = (props: Props) => {
  const parsed = new Map<string, number>();

  const now = DateTime.now();
  let current = DateTime.fromISO(props.symptom.diarySymptoms[0].date);
  while (true) {
    const label = current.toFormat('yyyy年M月');
    parsed.set(label, 0);

    if (current.year === now.year && current.month === now.month) {
      break;
    }

    current = current.plus({ months: 1 });
  }

  props.symptom.diarySymptoms.forEach(ds => {
    const dateLabel = DateTime.fromISO(ds.date).toFormat('yyyy年M月');
    parsed.set(dateLabel, (parsed.get(dateLabel) ?? 0) + 1);
  });

  const datasets: ChartDataset[] = [];

  datasets.push({
    label: props.symptom.name,
    data: Array.from(parsed.values()),
    backgroundColor: getColor(props.symptom.color)['800'],
    yAxisID: 'symptom',
    borderWidth: 0,
    barPercentage: 0.3,
  });

  const labels = Array.from(parsed.keys());

  const data: ChartData = {
    labels,
    datasets,
  };

  const options: ChartOptions = {
    scales: {
      'symptom': {
        position: 'left',
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className={containerStyle}>
      <Bar data={data} options={options} />
    </div>
  );
};

const containerStyle = css`
  padding: 1.6rem;
`;
