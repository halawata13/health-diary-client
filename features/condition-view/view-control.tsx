import { css } from "@emotion/css";
import { Button } from "../../components/button";
import { IoBarChartOutline, IoCalendarOutline, IoListOutline } from "react-icons/io5";
import { variables } from '../../styles/variables';

export enum ViewType {
  list,
  calendar,
  graph,
}

interface Props {
  selected: ViewType;
  onViewButtonClicked: (viewType: ViewType) => void;
}

/**
 * ビュー選択
 */
export const ViewControl = (props: Props) => (
  <div className={containerStyle}>
    <Button onClick={() => props.onViewButtonClicked(ViewType.list)} className={[buttonStyle, props.selected === ViewType.list ? selectedStyle : ''].join(' ')}><IoListOutline /></Button>
    <Button onClick={() => props.onViewButtonClicked(ViewType.calendar)} className={[buttonStyle, props.selected === ViewType.calendar ? selectedStyle : ''].join(' ')}><IoCalendarOutline /></Button>
    <Button onClick={() => props.onViewButtonClicked(ViewType.graph)} className={[buttonStyle, props.selected === ViewType.graph ? selectedStyle : ''].join(' ')}><IoBarChartOutline /></Button>
  </div>
);

const containerStyle = css`
  display: flex;
  align-items: center;
`;

const buttonStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  min-width: auto;
  height: 4.4rem;
  margin-left: -1px;
  padding: 0 0.8rem;
  border-radius: 0;
  border: solid 1px ${variables.colorBorder};
  background-color: #fff;
  font-size: 2rem;
  font-weight: bold;
  color: ${variables.colorTextDark};

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

const selectedStyle = css`
  background-color: ${variables.colorTextDark};
  color: #fff;
`;
