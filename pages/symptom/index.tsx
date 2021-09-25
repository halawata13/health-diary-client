import React from 'react';
import useSWR from 'swr';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Main } from "../../components/main";
import { SectionHeader } from "../../components/section-header";
import { Auth } from '../../components/auth';
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';
import { getErrorComponent } from '../../components/error';
import { Symptom } from '../../types';
import { getLoadingComponent } from '../../components/loading';
import { AxiosError } from 'axios';
import { SymptomList } from "../../components/symptom-list";
import { Button } from "../../components/button";
import { useRouter } from "next/router";

/**
 * 症状一覧ページ
 */
export default function Index() {
  const user = UserService.load();
  const router = useRouter();
  const { data: symptoms, error: symptomsError } = useSWR<Symptom[], AxiosError>('/symptom/all', getFetcher('/symptom/all', user));

  if (symptomsError || user == null) {
    return getErrorComponent(symptomsError);
  }

  if (symptoms === undefined) {
    return getLoadingComponent();
  }

  // 編集クリック時
  const onEditClicked = async () => {
    await router.push('symptom/edit');
  };

  return (
    <Auth>
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
    </Auth>
  );
}
