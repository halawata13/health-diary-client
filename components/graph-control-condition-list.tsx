import React from 'react';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { grey } from "@material-ui/core/colors";
import { IoEyeOutline } from "react-icons/io5";
import { Diary, DiaryNoData } from '../types';

interface Props {
  diaries: (Diary | DiaryNoData)[];
  onCheckChanged: (checked: boolean) => void;
  displayCondition: boolean;
}

export const GraphControlConditionList: React.VFC<Props> = props => {
  const values = props.diaries.filter(d => 'id' in d).map(d => ('id' in d) ? d.condition : 0);

  const min = values.length > 0 ? Math.min(...values) : null;
  const max = values.length > 0 ? Math.max(...values) : null;
  const median = calcMedian(values);

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <div className={headerLabelStyle}>最小値</div>
        <div className={headerLabelStyle}>中央値</div>
        <div className={headerLabelStyle}>最大値</div>
      </div>
      <div className={[listStyle, props.displayCondition ? '-checked' : ''].join(' ')} onClick={() => props.onCheckChanged(!props.displayCondition)}>
        <div className={checkStyle}>
          <IoEyeOutline className={checkIconStyle} />
        </div>
        <div className={labelStyle}>コンディション</div>
        <div className={valueStyle}>{min}</div>
        <div className={valueStyle}>{median}</div>
        <div className={valueStyle}>{max}</div>
      </div>
    </div>
  );
};

const calcMedian = (values: number[]) => {
  if (values.length === 0) {
    return null;
  }

  values.sort();
  const half = Math.floor(values.length / 2);

  if (values.length % 2 === 0) {
    return (values[half] + values[half - 1]) / 2;
  } else {
    return values[half];
  }
};

const containerStyle = css`
  margin-bottom: 3.6rem;
`;

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
    border-color: ${grey["50"]};
    background-color: ${grey["50"]};
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
    border-color: ${grey["800"]};
    background-color: ${grey["800"]};
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
