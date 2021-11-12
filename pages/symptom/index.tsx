import React from 'react';
import useSWR from 'swr';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Main } from "../../components/main";
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';
import { Symptom } from '../../types';
import { AxiosError } from 'axios';
import { SymptomList } from "../../features/symptom-list/symptom-list";
import { RedirectToLogin } from '../../components/redirect-to-login';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { SymptomIndexHeader } from "../../features/symptom-list/symptom-index-header";

/**
 * 症状一覧ページ
 */
export default function Index() {
  const user = UserService.load();
  const { data: symptoms, error: symptomsError } = useSWR<Symptom[], AxiosError>('/symptom/all', getFetcher('/symptom/all', user));

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

  return (
    <>
      <Header />
      <Main>
        <Section>
          <SymptomIndexHeader />
          <SymptomList symptoms={symptoms} />
        </Section>
      </Main>
    </>
  );
}
