import { css } from '@emotion/css';
import { blue, grey, red } from '@material-ui/core/colors';
import { variables } from "../../../styles/variables";
import { useRecoilState, useSetRecoilState } from "recoil";
import { diaryFormModalState } from "../../../states/diary-form-modal.state";
import { dateState } from '../../../states/date.state';
import { Diary, DiaryNoData } from '../../../types';
import { getColor } from "../../../services/color.service";

interface Props {
  diaries: (Diary | DiaryNoData)[];
}

/**
 * カレンダー
 *
 * @constructor
 */
export const CalendarTable = (props: Props) => {
  const [ date, setDate ] = useRecoilState(dateState);
  const setDiaryFromModalState = useSetRecoilState(diaryFormModalState);

  const diariesMap = new Map<number, Diary | DiaryNoData>();
  props.diaries.forEach(diary => diariesMap.set(diary.date.day, diary));

  const onClicked = (diary?: Diary | DiaryNoData) => {
    if (diary === undefined) {
      return;
    }

    const params = 'id' in diary ? {
      condition: diary.condition,
    } : undefined;

    setDate(diary.date);
    setDiaryFromModalState({
      show: true,
      params: params,
      diary: 'id' in diary ? diary : undefined,
    });
  };

  const selectedDateObj = date.toJSDate();
  const dateObj = new Date();

  const todayYear = dateObj.getFullYear();
  const todayDate = dateObj.getDate();
  const todayMonth = dateObj.getMonth();

  const weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDateCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const calendarYear = selectedDateObj.getFullYear();

  const calendarDateObj = new Date(calendarYear, selectedDateObj.getMonth());
  // うるう年
  monthDateCount[1] = ((calendarYear % 4) === 0 && (calendarYear % 100) !== 0) || (calendarYear % 400) === 0 ? 29 : 28;

  const calendarMonth = calendarDateObj.getMonth();
  calendarDateObj.setDate(1);
  const calendarFirstDay = calendarDateObj.getDay();
  const calendarRows = Math.ceil((calendarFirstDay + monthDateCount[calendarMonth]) / 7);
  const calendarCells = new Array<number | null>(7 * calendarRows);

  for (let i = 0; i < 7 * calendarRows; i++) {
    calendarCells[i] = null;
  }

  for (let i = 0; i < monthDateCount[calendarMonth]; i++) {
    calendarCells[i + calendarFirstDay] = i + 1;
  }

  const source: JSX.Element[] = [];
  let emptyKey = -1;

  Array.from(Array(calendarRows)).forEach((_, i) => {
    const row: JSX.Element[] = [];

    Array.from(Array(7)).forEach((_, j) => {
      const calendarDate = calendarCells[j + (i * 7)];
      const key = calendarDate ?? emptyKey--;

      const selected = calendarDate === selectedDateObj.getDate();
      const today = todayYear === calendarYear && todayMonth === calendarMonth && todayDate === calendarDate;
      const sat = j === 6;
      const sun = j === 0;

      if (!calendarDate) {
        row.push(<td key={key} className={tdStyle} />);
        return;
      }

      const cellDateClass = [calendarCellDateStyle];
      if (today) {
        cellDateClass.push(calendarCellTodayStyle);
      }
      if (selected) {
        cellDateClass.push('-selected');
      }
      if (sat) {
        cellDateClass.push(calendarCellSatStyle);
      }
      if (sun) {
        cellDateClass.push(calendarCellSunStyle);
      }

      const diary = diariesMap.get(calendarDate);
      const condition = diary && 'id' in diary ? diary.condition : null;
      const symptoms = diary && 'id' in diary ? diary.symptoms.map(symptom => (
        <li key={symptom.symptomId} className={cellSymptomItemStyle}>
          <span className={cellSymptomValueStyle} style={{
            backgroundColor: getColor(symptom.symptom.color)?.['800']
          }}>{symptom.level}</span>
          <span className={cellSymptomNameStyle}>{symptom.symptom.name}</span>
        </li>
      )) : null;

      const tdClass = (() => {
        const tdClass = [tdStyle];
        if (!condition) {
          return tdClass;
        }

        if (condition <= -50) {
          tdClass.push('-so-bad');
        }
        if (condition < 0) {
          tdClass.push('-bad');
        }
        if (condition >= 50) {
          tdClass.push('-so-good');
        }
        if (condition > 0) {
          tdClass.push('-good');
        }
        return tdClass;
      })();

      row.push(
        <td key={key} onClick={() => onClicked(diary)} className={tdClass.join(' ')}>
          <div className={tdCellStyle}>
            <div className={cellAboveStyle}>
              <span className={cellDateClass.join(' ')}>{calendarDate}</span>
              <span className={conditionStyle}>{condition}</span>
            </div>
            <ul className={cellSymptomListStyle}>{symptoms}</ul>
          </div>
        </td>
      );
    });

    source.push(<tr key={i}>{row}</tr>);
  });

  const week = Array.from(Array(7)).map((_, i) => {
    if (i === 0) {
      return <th key={weekLabel[i]} className={thStyle}><div className={[thCellStyle, calendarCellSunStyle].join(' ')}>{weekLabel[i]}</div></th>;
    } else if (i === 6) {
      return <th key={weekLabel[i]} className={thStyle}><div className={[thCellStyle, calendarCellSatStyle].join(' ')}>{weekLabel[i]}</div></th>;
    } else {
      return <th key={weekLabel[i]} className={thStyle}><div className={thCellStyle}>{weekLabel[i]}</div></th>;
    }
  });

  return (
    <div>
      <table className={calendarContainerStyle}>
        <thead>
        <tr>{week}</tr>
        </thead>
        <tbody>
        {source}
        </tbody>
      </table>
    </div>
  );
};

const calendarContainerStyle = css`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  line-height: 1.3;
  font-size: 1.4rem;
`;

const thStyle = css`
  width: calc(100% / 7);
  border: solid 1px ${variables.colorBorder};
  font-family: "Mulish", sans-serif;
`;

const tdStyle = css`
  border: solid 1px ${variables.colorBorder};
  vertical-align: top;

  &.-so-good {
    background-color: ${blue["100"]};
  }

  &.-good {
    background-color: ${blue["50"]};
  }

  &.-bad {
    background-color: ${red["50"]};
  }

  &.-so-bad {
    background-color: ${red["100"]};
  }
`;

const calendarBaseStyle = css`
  position: relative;

  & span {
    position: relative;
    z-index: 1;
  }

  &.-selected::before {
    content: '';
    position: absolute;
    left: calc(50% - 2rem);
    top: 0;
    height: 4rem;
    width: 4rem;
    border-radius: 100%;
    animation: bounce 0.5s;
  }

  &.-selected::after {
    content: attr(data-value);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const thCellStyle = css(calendarBaseStyle, css`
  padding: 0.4rem 1rem;
  font-weight: normal;
`);

const tdCellStyle = css(calendarBaseStyle, css`
  min-height: 10rem;
`);

const calendarCellDateStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-bottom-right-radius: 0.4rem;
  background-color: ${grey['50']};
`;

const calendarCellSatStyle = css`
  color: ${blue['800']};
`;

const calendarCellSunStyle = css`
  color: ${red['800']};
`;

const calendarCellTodayStyle = css`
  font-weight: bold;
`;

const cellAboveStyle = css`
  display: flex;
  justify-content: space-between;
`;

const cellSymptomListStyle = css`
  list-style: none;
  padding: 0.8rem 0.4rem 0.4rem;
  font-size: 1.3rem;
`;

const cellSymptomItemStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const cellSymptomValueStyle = css`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.4rem;
  border-radius: 5px;
  background-color: ${grey["800"]};
  font-size: 1.2rem;
  color: #fff;
`;

const cellSymptomNameStyle = css`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const conditionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.4rem;
  height: 2.4rem;
  border-radius: 6px;

  &.-so-good {
    background-color: ${blue["100"]};
  }

  &.-good {
    background-color: ${blue["50"]};
  }

  &.-bad {
    background-color: ${red["50"]};
  }

  &.-so-bad {
    background-color: ${red["100"]};
  }
`;
