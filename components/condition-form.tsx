import React, { useEffect, useState } from 'react';
import { Section } from "./section";
import { SectionHeader } from "./section-header";
import { Button, buttonStyle } from "./button";
import { css } from "@emotion/css";
import { inputStyle } from "../styles/shared/form";
import { variables } from "../styles/variables";
import { useFieldArray, useForm } from 'react-hook-form';
import { Symptom } from '../types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { diaryFormModalState } from '../states/diary-form-modal.state';
import { blue } from "@material-ui/core/colors";
import { IoAddCircle, IoTrashOutline } from "react-icons/io5";
import { dateState } from '../states/date.state';

export interface DiaryFormParams {
  id?: number;
  condition: number;
  symptoms: SymptomInput[];
}

interface Props {
  onSubmit: (params: DiaryFormParams, deleteIds: number[], id?: number) => void;
  symptoms: Symptom[];
  params?: DiaryFormParams;
}

interface SymptomInput {
  symptomId?: string;
  name: string;
  level: string;
}

const defaultParams: DiaryFormParams = {
  condition: 0,
  symptoms: [],
};

export const ConditionForm: React.VFC<Props> = props => {
  const date = useRecoilValue(dateState);
  const [ modalState, setDiaryFormModalState ] = useRecoilState(diaryFormModalState);
  const params = modalState.params ?? defaultParams;
  const { register, handleSubmit, control, reset, setValue } = useForm<DiaryFormParams>({ defaultValues: params });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'symptoms',
  });
  const [ symptomName, setSymptomName ] = useState('');
  const [ deleteIds, setDeleteIds ] = useState<number[]>([]);
  const mapSymptomNameIds = new Map<string, number>();
  props.symptoms.forEach(s => mapSymptomNameIds.set(s.name, s.id));

  useEffect(() => {
    setValue('condition', modalState.params?.condition ?? 0);
  }, [date]);

  const onAppendClicked = () => {
    if (symptomName === '') {
      return;
    }

    append({
      name: symptomName,
      level: '1',
    });

    setSymptomName('');
  };

  const onAppendInputChange = (name: string) => {
    setSymptomName(name);
  };

  const onDeleteSymptom = (id: number) => {
    if (modalState.diary == null) {
      return;
    }

    setDeleteIds(deleteIds.concat(id));

    const symptoms = modalState.diary.symptoms.filter(s => s.id !== id);
    setDiaryFormModalState({
      ...modalState,
      diary: {
        ...modalState.diary,
        symptoms,
      },
    });
  };

  const onSubmit = handleSubmit(data => {
    const symptoms = data.symptoms.map(s => {
      const symptomId = mapSymptomNameIds.get(s.name);
      if (symptomId != null) {
        s.symptomId = String(symptomId);
      }

      return s;
    });

    console.log(data);
    props.onSubmit(data, deleteIds, modalState.diary?.id);
    setDiaryFormModalState({ show: false });
    reset();
  });

  const onCancel = () => {
    setDiaryFormModalState({ show: false });
    reset();
  };

  return (
    <Section>
      <SectionHeader>
        <div className={headerStyle}>
          <h1 className={titleStyle}>{date.toFormat('yyyy/MM/dd')}</h1>
        </div>
      </SectionHeader>
      <main className={mainStyle}>
        <form onSubmit={onSubmit}>
          <dl className={rowStyle}>
            <dt className={labelStyle}>コンディション</dt>
            <dd className={contentStyle}>
              <input type="number" className={conditionInputStyle} {...register('condition', { min: -100, max: 100 })} />
            </dd>
          </dl>
          <dl className={rowStyle}>
            <dt className={labelStyle}>症状</dt>
            <dd className={contentStyle}>
              {modalState.diary?.symptoms.map(s => (
                <div key={s.symptom.id} className={valueRowStyle}>
                  <span className={valueLevelStyle}>{s.level}</span>
                  <span className={valueNameStyle}>{s.symptom.name}</span>
                  <Button onClick={() => onDeleteSymptom(s.id)} variant={'danger'} iconOnly={true}>
                    <IoTrashOutline />
                  </Button>
                </div>
              ))}

              {fields.map((symptom, i) => (
                <div key={symptom.id} className={valueRowStyle}>
                  <input key={symptom.id} {...register(`symptoms.${i}.level` as const, { min: 1, max: 10 })} type="number" defaultValue={symptom.level} className={levelInputStyle} />
                  <span className={valueNameStyle}>{symptom.name}</span>
                  <Button onClick={() => remove(i)} variant={'danger'} iconOnly={true}>
                    <IoTrashOutline />
                  </Button>
                </div>
              ))}
              {modalState.diary?.symptoms.length === 0 && fields.length === 0 && (
                <div className={noSymptomStyle}>症状が登録されていません</div>
              )}
              <div className={appendRowStyle}>
                <input type="text" value={symptomName} onChange={ev => onAppendInputChange(ev.currentTarget.value)} className={appendInputStyle} list="symptom-list" placeholder={'新たに症状を追加...'} />
                <Button variant={'info'} onClick={() => onAppendClicked()} disabled={symptomName === ''} className={appendButtonStyle}>
                  <IoAddCircle />
                </Button>
              </div>
              <datalist id="symptom-list">
                {props.symptoms.map((symptom, index) => (
                  <option key={index}>{symptom.name}</option>
                ))}
              </datalist>
            </dd>
          </dl>
          <div className={formFooterStyle}>
            <Button onClick={() => onCancel()}>
              キャンセル
            </Button>
            <Button variant={'success'} type="submit">
              完了
            </Button>
          </div>
        </form>
      </main>
    </Section>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const titleStyle = css`
  font-size: 2rem;
  font-weight: normal;
`;

const mainStyle = css`
  padding: 1.6rem;
`;

const rowStyle = css`
  display: flex;
  margin-bottom: 1.6rem;
  padding-top: 1.6rem;
  border-top: solid 1px ${variables.colorBorder};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }
`;

const labelStyle = css`
  flex: 0 0 auto;
  width: 12rem;
  padding-top: 1.2rem;
  font-size: 1.4rem;
`;

const contentStyle = css`
  flex-grow: 1;
`;

const valueRowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: solid 1px ${variables.colorBorder};
  
  &:last-child {
    border-bottom: none;
  }
`;

const conditionInputStyle = css(inputStyle, css`
  width: 7.5rem;
`);

const appendRowStyle = css`
  display: flex;
  padding-top: 0.8rem;
  
  &:first-child {
    padding-top: 0;
  }
`;

const appendInputStyle = css(inputStyle, css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
`);

const appendButtonStyle = css(buttonStyle, css`
  width: 4.8rem;
  min-width: auto;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-color: ${blue["100"]};
  background-color: ${blue["50"]};
  color: ${blue["900"]};
  
  svg {
    margin-right: 0;
  }
`);

const noSymptomStyle = css`
  margin-bottom: 0.8rem;
  padding-top: 0.4rem;
  padding-bottom: 1.6rem;
  border-bottom: solid 1px ${variables.colorBorder};
  font-size: 1.4rem;
`;

const levelInputStyle = css(inputStyle, css`
  width: 4.8rem;
`);

const valueNameStyle = css`
  flex-grow: 1;
  padding: 0 1.6rem;
  font-size: 1.4rem;
`;

const valueLevelStyle = css`
  font-size: 1.4rem;
`;

const formFooterStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 1.6rem 0 0 0;
  border-top: solid 1px ${variables.colorBorder};
`;
