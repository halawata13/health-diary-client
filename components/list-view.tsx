import { ConditionList } from "./condition-list";
import { Diary, DiaryNoData } from "../types";
import { css } from "@emotion/css";
import { DateTime } from 'luxon';

interface Props {
  diaries: (Diary | DiaryNoData)[];
}

const now = DateTime.now();

export const ListView = (props: Props) => {
  const diaries = props.diaries.filter(diary => now.month !== diary.date.month || now.day >= diary.date.day).reverse();

  return (
    <main className={mainStyle}>
      <ConditionList diaries={diaries} />
    </main>
  );
};

const mainStyle = css`
  padding: 1.6rem;
`;
