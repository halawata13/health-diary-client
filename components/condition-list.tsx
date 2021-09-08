import React from 'react';
import { css } from "@emotion/css";
import { ConditionListItem } from "./condition-list-item";
import { Diary, DiaryNoData } from "../types";

interface Props {
  diaries: (Diary | DiaryNoData)[];
}

export const ConditionList: React.VFC<Props> = props => {
  return (
    <ul className={listStyle}>
      {props.diaries.map((diary, index) => (
        <ConditionListItem key={index} diary={diary} />
      ))}
    </ul>
  );
};

const listStyle = css`
  list-style: none;
`;
