import React, { useEffect, useState } from 'react';
import { Button } from "./button";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { useRecoilState } from 'recoil';
import { dateState } from '../states/date.state';
import { DateTime } from 'luxon';

const now = DateTime.now();

export const MonthControl: React.VFC = () => {
  const [ date, setDate ] = useRecoilState(dateState);
  const [ nextDisabled, setNextDisabled ] = useState(false);

  useEffect(() => {
    setNextDisabled(date.year === now.year && date.month === now.month);
  }, [date]);

  const onDateChanged = (duration: number) => {
    const targetDate = date.plus({ month: duration }).set({ day: 1 });
    setDate(targetDate);
  };

  return (
    <div className={containerStyle}>
      <Button onClick={() => onDateChanged(-1)} iconOnly={true}>
        <IoChevronBackOutline />
      </Button>
      <div className={dateStyle}>
        <span className={yearStyle}>{date.year}</span>
        <span className={monthStyle}>{String(date.month).padStart(2, '0')}</span>
      </div>
      <Button onClick={() => onDateChanged(1)} iconOnly={true} disabled={nextDisabled}>
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  align-items: center;
`;

const dateStyle = css`
  margin: 0 1.6rem;
`;

const yearStyle = css`
  font-size: 2.4rem;
  color: ${variables.colorTextLight};
`;

const monthStyle = css`
  font-size: 2.4rem;
  color: ${variables.colorTextDark};
`;
