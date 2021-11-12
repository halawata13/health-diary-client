import { SymptomWithDiarySymptoms } from "../../types";
import { DateTime } from "luxon";
import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { getColor } from "../../services/color.service";
import { Bar } from "react-chartjs-2";
import { css } from "@emotion/css";

interface Props {
  symptom: SymptomWithDiarySymptoms;
}

/**
 * 月当たりの重症度平均グラフ
 */
export const SymptomGraphMonthRate = (props: Props) => {
  const counts = new Map<number, number>();
  const levels = new Map<number, number>();
  const rates = new Map<string, number>();
  let date = DateTime.fromObject({ year: 2021, month: 1, day: 1 });

  // 重症度と出現回数を計算
  props.symptom.diarySymptoms.forEach(ds => {
    const month = DateTime.fromISO(ds.date).month;
    levels.set(month, (levels.get(month) ?? 0) + ds.level);
    counts.set(month, (counts.get(month) ?? 0) + 1);
  });

  Array.from(Array(12)).forEach(_ => {
    const count = counts.get(date.month) ?? 0;
    if (count === 0) {
      rates.set(date.toFormat('M月'), 0);
      date = date.plus({ months: 1 });
      return;
    }

    // 重症度合計を出現回数で割って平均を出す
    const rate = Math.round((levels.get(date.month) ?? 0) / count * 100) / 100;
    rates.set(date.toFormat('M月'), rate);

    date = date.plus({ months: 1 });
  });

  const datasets: ChartDataset[] = [];

  datasets.push({
    label: props.symptom.name,
    data: Array.from(rates.values()),
    backgroundColor: getColor(props.symptom.color)['800'],
    yAxisID: 'symptom',
    borderWidth: 0,
    barPercentage: 0.3,
  });

  const labels = Array.from(rates.keys());

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
