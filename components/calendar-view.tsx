import React from 'react';
import { CalendarTable } from './calendar-table';
import { Diary, DiaryNoData } from '../types';

interface Props {
  diaries: (Diary | DiaryNoData)[];
}

export const CalendarView: React.VFC<Props> = props => {
  console.log(props.diaries);
  return (
    <>
      <CalendarTable diaries={props.diaries} />
    </>
  );
};
