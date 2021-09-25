import { Symptom } from "../types";
import { css } from "@emotion/css";
import { grey } from "@material-ui/core/colors";
import { getColor } from "../services/color.service";

interface Props {
  symptoms: Symptom[];
}

export const SymptomList = (props: Props) => {
  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <div className={contentColorStyle}>識別色</div>
        <div className={contentSymptomStyle}>症状名</div>
        <div className={contentCountStyle}>出現回数</div>
      </div>
      <ul className={listStyle}>
        {props.symptoms.map(symptom => (
          <li key={symptom.id} className={itemStyle}>
            <div className={contentColorStyle}>
              <span className={colorIconStyle} style={{
                backgroundColor: getColor(symptom.color)?.['800']
              }} />
            </div>
            <div className={contentSymptomStyle}>{symptom.name}</div>
            <div className={contentCountStyle}>{symptom.count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const containerStyle = css`
  padding: 1.6rem;
  font-size: 1.4rem;
`;

const headerStyle = css`
  display: flex;
  border-bottom: solid 1px ${grey['300']};
  font-weight: bold;
`;

const listStyle = css`
  list-style: none;
`;

const itemStyle = css`
  display: flex;
  border-bottom: solid 1px ${grey['200']};
`;

const contentColorStyle = css`
  width: 10%;
  padding: 0.8rem 0.4rem;
  text-align: center;
`;

const colorIconStyle = css`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
`;

const contentSymptomStyle = css`
  width: 80%;
  padding: 0.8rem 0.4rem;
`;

const contentCountStyle = css`
  width: 10%;
  padding: 0.8rem 0.4rem;
  text-align: center;
`;
