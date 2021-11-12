import React from 'react';
import useSWR from 'swr';
import { SymptomForm } from '../../features/symptom-edit/symptom-form';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Main } from "../../components/main";
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';
import { NewSymptom, Symptom } from '../../types';
import { SymptomService } from '../../services/symptom.service';
import { useSetRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../../states/toast.state';
import { AxiosError } from 'axios';
import { RedirectToLogin } from '../../components/redirect-to-login';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { SymptomEditHeader } from "../../features/symptom-edit/symptom-edit-header";

/**
 * 症状編集ページ
 */
export default function Edit() {
  const user = UserService.load();
  const { data: symptoms, error: symptomsError, mutate: mutateSymptoms } = useSWR<Symptom[], AxiosError>('/symptom/all', getFetcher('/symptom/all', user));
  const setToastState = useSetRecoilState(toastState);

  // 認証エラー時
  if (!user || symptomsError?.response?.status === 401) {
    return <RedirectToLogin />;
  }

  // ローディング中
  if (!symptoms) {
    return <Loading />;
  }

  // エラー時
  if (symptomsError) {
    return <Error />;
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
    <>
      <Header />
      <Main>
        <Section>
          <SymptomEditHeader />
          <SymptomForm symptoms={symptoms} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} />
        </Section>
      </Main>
    </>
  );
}
