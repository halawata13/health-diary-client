import { css } from '@emotion/css';
import { variables } from '../styles/variables';

const symptomGraphTypes = ['oneYear', 'all'] as const;
export type SymptomGraphType = typeof symptomGraphTypes[number];

interface Props {
  onChange: (type: SymptomGraphType) => void;
}

export const SymptomSelector = (props: Props) => {
  return (
    <select onChange={ev => props.onChange(ev.target.value as SymptomGraphType)} className={colorSelectStyle}>
      <option value={symptomGraphTypes[0]}>過去一年</option>
      <option value={symptomGraphTypes[1]}>全期間</option>
    </select>
  )
};

const colorSelectStyle = css`
  height: 4.4rem;
  width: 20rem;
  margin-right: 0.8rem;
  padding: 0 0.8rem;
  border-radius: 1rem;
  border: solid 1px ${variables.colorBorder};
  background-color: #fff;
  font-size: 1.4rem;
`;
