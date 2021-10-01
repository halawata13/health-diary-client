import React, { useEffect, useState } from 'react';
import { Symptom, Color, colors, NewSymptom } from '../types';
import { Button } from './button';
import { css } from "@emotion/css";
import { inputStyle } from "../styles/shared/form";
import { variables } from "../styles/variables";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { getColor } from '../services/color.service';

interface Props {
  symptoms: Symptom[];
  onCreate: (symptom: NewSymptom) => void;
  onUpdate: (symptom: Symptom) => void;
  onDelete: (symptom: Symptom) => void;
}

/**
 * 症状リスト
 */
export const SymptomForm: React.VFC<Props> = props => {
  const [ symptoms, setSymptoms ] = useState<(Symptom | NewSymptom)[]>(props.symptoms);
  let newSymptomId = -1;

  useEffect(() => {
    setSymptoms(props.symptoms);
  }, [props.symptoms]);

  // 追加クリック
  const onAppendClicked = () => {
    setSymptoms([
      ...symptoms,
      {
        name: '',
        color: colors[0],
        count: 0,
      },
    ]);
  };

  // 色変更時
  const onColorChanged = (symptom: Symptom | NewSymptom, color: string, index: number) => {
    if ('id' in symptom) {
      props.onUpdate({
        ...symptom,
        color: color as Color,
      });
    } else {
      setSymptoms(symptoms.map((s, i) => {
        if (index === i) {
          return {
            ...s,
            color: color as Color,
          }
        }

        return s;
      }));
    }
  };

  // 名称変更時
  const onNameChanged = (symptom: Symptom | NewSymptom, name: string, index: number) => {
    if ('id' in symptom) {
      props.onUpdate({
        ...symptom,
        name,
      });
    } else {
      props.onCreate({
        name,
        color: symptoms[index]?.color ?? 'red',
        count: 0,
      });
    }
  };

  // 削除時
  const onDeleted = (symptom: Symptom | NewSymptom, index: number) => {
    if (!('id' in symptom)) {
      symptoms.splice(index, 1);
      setSymptoms(symptoms);
      return;
    }

    props.onDelete(symptom);
  };

  return (
    <form className={containerStyle}>
      <div className={labelRowStyle}>
        <div className={labelFirstStyle}>識別色</div>
        <div>名前</div>
      </div>
      <ul className={listStyle}>
        {symptoms.map((symptom, index) => (
          <li className={itemStyle} key={'id' in symptom ? symptom.id : newSymptomId--}>
            <span className={colorIconStyle} style={{
              backgroundColor: getColor(symptom.color)?.['800']
            }} />
            <select defaultValue={symptom.color} className={colorSelectStyle} onChange={ev => onColorChanged(symptom, ev.currentTarget.value, index)}>
              {colors.map((color, index) => (
                <option value={color} key={index}>{color}</option>
              ))}
            </select>
            <input defaultValue={symptom.name} onChange={ev => onNameChanged(symptom, ev.currentTarget.value, index)} className={nameInputStyle} max={255} />
            <Button onClick={() => onDeleted(symptom, index)} variant={'danger'} iconOnly={true} disabled={symptom.isDeletable === false}>
              <IoTrashOutline />
            </Button>
          </li>
        ))}
      </ul>
      <div className={buttonSetStyle}>
        <Button onClick={() => onAppendClicked()} variant={'info'}>
          <IoAddCircleOutline />
          追加
        </Button>
      </div>
    </form>
  );
};

const containerStyle = css`
  padding: 1.6rem;
`;

const listStyle = css`
  margin-bottom: 1.6rem;
`;

const itemStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const colorIconStyle = css`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
  border-radius: 0.3rem;
`;

const colorSelectStyle = css`
  height: 4.4rem;
  width: 10rem;
  margin-right: 0.8rem;
  padding: 0 0.8rem;
  border-radius: 1rem;
  border: solid 1px ${variables.colorBorder};
  font-size: 1.4rem;
`;

const nameInputStyle = css(inputStyle, css`
  flex-grow: 1;
  margin-right: 0.8rem;
`);

const buttonSetStyle = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 1.6rem;
  border-top: solid 1px ${variables.colorBorder};
`;

const labelRowStyle = css`
  display: flex;
  margin-bottom: 0.4rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

const labelFirstStyle = css`
  width: 12.8rem;
`;
