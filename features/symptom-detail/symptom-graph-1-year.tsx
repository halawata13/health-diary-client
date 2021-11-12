import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { css } from '@emotion/css';
import { Bar } from 'react-chartjs-2';
import { SymptomWithDiarySymptoms } from '../../types';
import { DateTime } from 'luxon';
import { getColor } from '../../services/color.service';

interface Props {
  from: DateTime;
  to: DateTime;
  symptom: SymptomWithDiarySymptoms;
}

/**
 * 過去一年の出現回数グラフ
 */
export const SymptomGraph1Year = (props: Props) => {
  const parsed = new Map<string, number>();

  let current = props.from;
  while (true) {
    current = current.plus({ months: 1 });

    const label = current.toFormat('yyyy年M月');
    parsed.set(label, 0);

    if (current.year === props.to.year && current.month === props.to.month) {
      break;
    }
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
