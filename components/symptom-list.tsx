import { Symptom } from "../types";
import { css } from "@emotion/css";
import { grey } from "@material-ui/core/colors";
import { getColor } from "../services/color.service";
import { IoChevronForwardOutline } from 'react-icons/io5';
import { variables } from '../styles/variables';
import Link from 'next/link';

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
        <div className={contentIconStyle} />
      </div>
      <ul className={listStyle}>
        {props.symptoms.map(symptom => (
          <li key={symptom.id}>
            <Link href={`/symptom/${symptom.id}`} passHref={true}>
              <a className={itemStyle}>
                <div className={contentColorStyle}>
                  <span className={colorIconStyle} style={{
                    backgroundColor: getColor(symptom.color)?.['800']
                  }} />
                </div>
                <div className={contentSymptomStyle}>{symptom.name}</div>
                <div className={contentCountStyle}>{symptom.count}</div>
                <div className={contentIconStyle}>
                  <IoChevronForwardOutline />
                </div>
              </a>
            </Link>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  padding: 1.2rem 0.4rem;
`;

const colorIconStyle = css`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.3rem;
`;

const contentSymptomStyle = css`
  flex-grow: 1;
  padding: 1.2rem 0.4rem;
`;

const contentCountStyle = css`
  width: 8rem;
  padding: 1.2rem 0.4rem;
  text-align: center;
`;

const contentIconStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 8rem;
  padding: 0 0.8rem;
  font-size: 1.6rem;
  color: ${variables.colorTextDark};
`;
