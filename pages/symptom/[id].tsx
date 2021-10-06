import useSWR from "swr";
import { SymptomWithDiarySymptoms } from "../../types";
import { AxiosError } from "axios";
import { DateTime } from "luxon";
import { UserService } from "../../services/user.service";
import { useRouter } from "next/router";
import { getFetcher } from "../../services/base.service";
import { Error } from "../../components/error";
import { Loading } from "../../components/loading";
import { Header } from '../../components/header';
import { Main } from '../../components/main';
import { Section } from '../../components/section';
import { SectionHeader } from '../../components/section-header';
import { SymptomGraph1Year } from '../../components/symptom-graph-1-year';
import { SymptomGraphType, SymptomSelector } from '../../components/symptom-graph-selector';
import { useState } from 'react';
import { SymptomGraphAll } from '../../components/symptom-graph-all';
import { RedirectToLogin } from '../../modules/RedirectToLogin';

export default function Detail() {
  const user = UserService.load();
  const router = useRouter();
  const from = DateTime.now().minus({ years: 1 });
  const to = DateTime.now();
  const [ type, setType ] = useState<SymptomGraphType>('oneYear');
  const url = `/symptom?id=${router.query.id}&fromYear=${from.year}&fromMonth=${from.month}&toYear=${to.year}&toMonth=${to.month}`;
  const { data: symptom, error: symptomError } = useSWR<SymptomWithDiarySymptoms, AxiosError>(url, getFetcher(url, user));

  // 認証エラー時
  if (!user || symptomError?.response?.status === 401) {
    return <RedirectToLogin />;
  }

  // ローディング中
  if (!symptom) {
    return <Loading />;
  }

  // エラー時
  if (symptomError) {
    return <Error />;
  }

  const graph = (() => {
    if (symptom.diarySymptoms.length === 0) {
      return <div>データがありません</div>;
    }

    switch (type) {
      case 'all':
        return <SymptomGraphAll symptom={symptom} />;

      case 'oneYear':
      default:
        return <SymptomGraph1Year from={from} to={to} symptom={symptom} />;
    }
  })();

  return (
    <>
      <Header />
      <Main>
        <Section>
          <SectionHeader>
            <h1>{symptom.name}</h1>
            <SymptomSelector onChange={type => setType(type)} />
          </SectionHeader>
          {graph}
        </Section>
      </Main>
    </>
  );
}
