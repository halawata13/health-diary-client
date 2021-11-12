import { css } from '@emotion/css';
import { variables } from '../../styles/variables';

const symptomGraphTypes = ['oneYear', 'all', 'monthRate', 'monthAppearance'] as const;
export type SymptomGraphType = typeof symptomGraphTypes[number];

interface Props {
  onChange: (type: SymptomGraphType) => void;
}

/**
 * 症状詳細グラフ選択
 */
export const SymptomSelector = (props: Props) => {
  return (
    <select onChange={ev => props.onChange(ev.target.value as SymptomGraphType)} className={colorSelectStyle}>
      <option value={symptomGraphTypes[0]}>過去一年の出現回数</option>
      <option value={symptomGraphTypes[1]}>全期間の出現回数</option>
      <option value={symptomGraphTypes[2]}>月当たりの重症度平均</option>
      <option value={symptomGraphTypes[3]}>月当たりの出現率</option>
    </select>
  )
};

const colorSelectStyle = css`
  height: 4.4rem;
  width: 24rem;
  margin-right: 0.8rem;
  padding: 0 0.8rem;
  border-radius: 1rem;
  border: solid 1px ${variables.colorBorder};
  background-image: url("/images/arrow.svg");
  background-repeat: no-repeat;
  background-size: 1.6rem 1.6rem;
  background-position: calc(100% - 0.4rem) center;
  background-color: #fff;
  font-size: 1.4rem;
`;
