import React from 'react';
import useSWR from 'swr';
import { SymptomList } from '../../components/symptom-list';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Main } from "../../components/main";
import { SectionHeader } from "../../components/section-header";
import { Auth } from '../../components/auth';
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';
import { getErrorComponent } from '../../components/error';
import { NewSymptom, Symptom } from '../../types';
import { SymptomService } from '../../services/symptom.service';
import { useSetRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../../states/toast.state';
import { getLoadingComponent } from '../../components/loading';
import { AxiosError } from 'axios';

/**
 * 症状一覧ページ
 */
export default function Index() {
  const user = UserService.load();
  const { data: symptoms, error: symptomsError, mutate: mutateSymptoms } = useSWR<Symptom[], AxiosError>('/symptom/all', getFetcher('/symptom/all', user));
  const setToastState = useSetRecoilState(toastState);

  if (symptomsError || user == null) {
    return getErrorComponent(symptomsError);
  }

  if (symptoms === undefined) {
    return getLoadingComponent();
  }

  const symptomService = new SymptomService(user);

  // 新規作成
  const onCreate = async (symptom: NewSymptom) => {
    try {
      const created = await symptomService.create(symptom);
      await mutateSymptoms(symptoms.concat(created));

    } catch (err) {
      console.error(err);

      setToastState({
        type: ToastMessageType.error,
        message: '登録に失敗しました',
        show: true,
      });
    }
  };

  // 更新
  const onUpdate = async (symptom: Symptom) => {
    try {
      const updated = await symptomService.update(symptom);
      await mutateSymptoms(symptoms.map(s => s.id === updated.id ? updated : s));

    } catch (err) {
      console.error(err);

      setToastState({
        type: ToastMessageType.error,
        message: '更新に失敗しました',
        show: true,
      });
    }
  };

  // 削除
  const onDelete = async (symptom: Symptom) => {
    try {
      await symptomService.delete(symptom);
      await mutateSymptoms(symptoms.filter(s => s.id !== symptom.id));

    } catch (err) {
      console.error(err);

      setToastState({
        type: ToastMessageType.error,
        message: '削除に失敗しました',
        show: true,
      });
    }
  };

  return (
    <Auth>
      <Header />
      <Main>
        <Section>
          <SectionHeader>
            <h1>症状一覧</h1>
          </SectionHeader>
          <SymptomList symptoms={symptoms} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} />
        </Section>
      </Main>
    </Auth>
  );
}
