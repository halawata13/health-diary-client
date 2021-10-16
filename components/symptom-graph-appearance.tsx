import { SymptomWithDiarySymptoms } from "../types";
import { DateTime } from "luxon";
import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { getColor } from "../services/color.service";
import { Bar } from "react-chartjs-2";
import { css } from "@emotion/css";

interface Props {
  symptom: SymptomWithDiarySymptoms;
}

/**
 * 月当たりの出現率グラフ
 */
export const SymptomGraphAppearance = (props: Props) => {
  const yearMonthCounts = new Map<number, Set<number>>();
  const counts = new Map<number, number>();
  const rates = new Map<string, number>();
  let date = DateTime.fromObject({ year: 2021, month: 1, day: 1 });

  // 月ごとの出現回数と年月別の出現回数を計算
  props.symptom.diarySymptoms.forEach(ds => {
    const date = DateTime.fromISO(ds.date);
    counts.set(date.month, (counts.get(date.month) ?? 0) + 1);
    yearMonthCounts.set(date.month, (yearMonthCounts.get(date.month) ?? new Set()).add(date.year));
  });

  Array.from(Array(12)).forEach(_ => {
    const count = counts.get(date.month) ?? 0;
    const yearMonthCount = yearMonthCounts.get(date.month)?.size ?? 1;

    // 出現回数を月の日数と年月別の回数で掛けたもので割る
    const rate = Math.round(count / date.daysInMonth * yearMonthCount * 10000) / 100;
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
        max: 100,
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
