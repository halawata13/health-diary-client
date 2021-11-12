import { CalendarTable } from './calendar-table';
import { Diary, DiaryNoData } from '../../../types';

interface Props {
  diaries: (Diary | DiaryNoData)[];
}

/**
 * カレンダービュー
 */
export const CalendarView = (props: Props) => {
  return (
    <CalendarTable diaries={props.diaries} />
  );
};
