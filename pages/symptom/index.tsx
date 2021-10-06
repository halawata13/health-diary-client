import React from 'react';
import useSWR from 'swr';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Main } from "../../components/main";
import { SectionHeader } from "../../components/section-header";
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';
import { Symptom } from '../../types';
import { AxiosError } from 'axios';
import { SymptomList } from "../../components/symptom-list";
import { Button } from "../../components/button";
import { useRouter } from "next/router";
import { RedirectToLogin } from '../../modules/RedirectToLogin';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';

/**
 * 症状一覧ページ
 */
export default function Index() {
  const user = UserService.load();
  const router = useRouter();
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

  // 編集クリック時
  const onEditClicked = async () => {
    await router.push('symptom/edit');
  };

  return (
    <>
      <Header />
      <Main>
        <Section>
          <SectionHeader>
            <h1>症状一覧</h1>
            <Button onClick={() => onEditClicked()}>症状の編集</Button>
          </SectionHeader>
          <SymptomList symptoms={symptoms} />
        </Section>
      </Main>
    </>
  );
}
