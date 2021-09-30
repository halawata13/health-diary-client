import React, { useEffect, useState } from 'react';
import { Button } from "./button";
import { IoCalendarClearOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { useRecoilState } from 'recoil';
import { dateState } from '../states/date.state';
import { DateTime } from 'luxon';

const now = DateTime.now();

/**
 * 年月コントロール
 */
export const MonthControl: React.VFC = () => {
  const [ date, setDate ] = useRecoilState(dateState);
  const [ nextDisabled, setNextDisabled ] = useState(false);
  const [ showForm, setShowForm ] = useState(false);
  const [ year, setYear ] = useState(now.year);
  const [ month, setMonth ] = useState(now.month);

  useEffect(() => {
    setNextDisabled(date.year === now.year && date.month === now.month);
  }, [date]);

  // 矢印ボタンでの変更時
  const onDateChanged = (duration: number) => {
    const targetDate = date.plus({ months: duration }).set({ day: 1 });
    setDate(targetDate);
  };

  // セレクトボックスからの変更時
  const onDateFormClosed = () => {
    setShowForm(false);
    setDate(date.set({ year, month }));
  };

  // 年リスト
  const years = (() => {
    // 2020年から現在年まで
    let year = 2020;
    const current = now.year;
    const arr = [];
    while (true) {
      arr.push(year);
      year += 1;
      if (year > current) {
        break;
      }
    }
    return arr;
  })();

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
      <div className={controlStyle}>
        <div onClick={() => onDateFormClosed()} className={[controlBgStyle, showForm ? '-show' : ''].join(' ')} />
        <Button iconOnly={true} onClick={() => setShowForm(true)}>
          <IoCalendarClearOutline />
        </Button>
        <div className={[controlFormStyle, showForm ? '-show' : ''].join(' ')}>
          <select className={controlSelectYearStyle} value={year} onChange={ev => setYear(Number(ev.target.value))}>
            {years.map(year => (
              <option key={year}>{year}</option>
            ))}
          </select>
          年
          <select className={controlSelectMonthStyle} value={month} onChange={ev => setMonth(Number(ev.target.value))}>
            {Array.from(Array(12))
              .filter((_, i) => year !== now.year || i + 1 <= now.month)
              .map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))
            }
          </select>
          月
        </div>
      </div>
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
  font-weight: bold;
  color: ${variables.colorTextDark};
`;

const controlStyle = css`
  position: relative;
  margin-left: 0.8rem;
`;

const controlFormStyle = css`
  position: absolute;
  top: 4.4rem;
  left: 0;
  z-index: 10;
  width: max-content;
  padding: 0.8rem 0.8rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  border: solid 1px ${variables.colorBorder};
  background-color: #fff;
  font-size: 1.4rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;

  &.-show {
    opacity: 1;
    pointer-events: auto;
  }
`;

const controlSelectStyle = css`
  height: 4.4rem;
  margin: 0 0.4rem;
  padding: 0 0.8rem;
  border-radius: 0.4rem;
  border: solid 1px ${variables.colorBorder};
  background-color: #fff;
  font-size: 1.4rem;
`;

const controlSelectYearStyle = css(controlSelectStyle, css`
  width: 9.6rem;
`);

const controlSelectMonthStyle = css(controlSelectStyle, css`
  width: 4.8rem;
`);

const controlBgStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;

  &.-show {
    opacity: 1;
    pointer-events: auto;
  }
`;
