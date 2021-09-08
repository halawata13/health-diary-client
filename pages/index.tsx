import { Dialog } from "../components/dialog";
import { Toast } from "../components/toast";
import { Header } from "../components/header";
import { Main } from "../components/main";
import { Section } from "../components/section";
import { SectionHeader } from "../components/section-header";
import { MonthControl } from "../components/month-control";
import { ViewControl, ViewType } from "../components/view-control";
import { GraphView } from "../components/graph-view";
import { Modal } from "../components/modal";
import { ConditionForm, DiaryFormParams } from "../components/condition-form";
import { useMemo, useState } from 'react';
import { ListView } from '../components/list-view';
import { CalendarView } from '../components/calendar-view';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { diaryFormModalState } from '../states/diary-form-modal.state';
import { Diary, DiaryCreateParams, DiaryNoData, DiaryUpdateParams, Symptom } from "../types";
import useSWR from 'swr';
import { dateState } from '../states/date.state';
import { getErrorComponent } from '../components/error';
import { getLoadingComponent } from '../components/loading';
import { DateTime } from 'luxon';
import axios, { AxiosError } from 'axios';
import { environment } from '../config/environment';
import { UserService } from '../services/user.service';
import { DiaryService } from '../services/diary.service';
import { getColorAtRandom } from '../services/color.service';
import { ToastMessageType, toastState } from '../states/toast.state';
import { Auth } from '../components/auth';
import { getConfig, getFetcher } from '../services/base.service';

/**
 * 記録閲覧ページ
 */
export default function Index() {
  const date = useRecoilValue(dateState);
  const [ viewType, setViewType ] = useState(ViewType.list);
  const [ diaryModalFormState, setDiaryModalFormState ] = useRecoilState(diaryFormModalState);
  const setToastState = useSetRecoilState(toastState);
  const user = UserService.load();
  const { data: symptoms, error: symptomsError, mutate: mutateSymptoms } = useSWR<Symptom[], AxiosError>('/symptom/all', getFetcher('/symptom/all', user));
  const { data: diaries, error: diariesError, mutate: mutateDiaries } = useSWR<Diary[], AxiosError>(
    `/diary?year=${date.year}&month=${date.month}`,
    args => axios.get(environment.baseUrl + args, getConfig(user)).then(res => {
      return res.data.map((diary: any) => ({
        ...diary,
        date: DateTime.fromFormat(diary.date, 'yyyy-MM-dd'),
      }));
    })
  );

  // 月ごとにデータを加工する
  const monthlyDiaries = useMemo(() => {
    if (!diaries) {
      return [];
    }

    const diariesMap = new Map<number, Diary>();
    diaries.forEach(diary => diariesMap.set(diary.date.day, diary));

    const data: (Diary | DiaryNoData)[] = [];
    let tmpDate = DateTime.now().set({ year: date.year, month: date.month, day: 1 });
    while (true) {
      const diary = diariesMap.get(tmpDate.day);
      if (diary) {
        data.push(diary);
      } else {
        data.push({
          date: tmpDate,
        });
      }

      tmpDate = tmpDate.plus({ days: 1 });

      if (tmpDate.month !== date.month) {
        break;
      }
    }

    return data;
  }, [date, diaries]);

  if (symptomsError || diariesError) {
    return getErrorComponent(symptomsError ?? diariesError);
  }

  if (!symptoms || !diaries) {
    return getLoadingComponent();
  }

  if (!user) {
    return getErrorComponent();
  }

  const diaryService = new DiaryService(user);

  // 記録の登録
  const onSubmit = async (data: DiaryFormParams, deleteIds: number[], id?: number) => {
    const params: DiaryCreateParams = {
      memo: '',
      date: date.toFormat('yyyy-MM-dd'),
      condition: Number(data.condition),
      symptoms: data.symptoms.map(s => ({
        symptomId: s.symptomId ? Number(s.symptomId) : undefined,
        level: Number(s.level),
        name: s.name,
        color: s.symptomId ? undefined : getColorAtRandom(),
      })),
      deleteSymptoms: deleteIds.map(id => ({ id })),
    };

    try {
      if (id === undefined) {
        const diary = await diaryService.create(params);
        diaries.push(diary);
        diaries.sort((a, b) => a.date >= b.date ? 1 : -1);
        await mutateDiaries(diaries);

      } else {
        const updateParams: DiaryUpdateParams = Object.assign({}, params, { id: Number(id) });
        const diary = await diaryService.update(updateParams);
        await mutateDiaries(diaries.map(d => d.id === diary.id ? diary : d));
      }

      await mutateSymptoms();

    } catch (err) {
      console.error(err);
      setToastState({
        type: ToastMessageType.error,
        message: '登録に失敗しました',
        show: true,
      });
    }
  };

  return (
    <Auth>
      <Header user={user} />
      <Main>
        <Section>
          <SectionHeader>
            <MonthControl />
            <ViewControl selected={viewType} onViewButtonClicked={viewType => setViewType(viewType)} />
          </SectionHeader>
          {
            viewType === ViewType.list ? <ListView diaries={monthlyDiaries} />
              : viewType === ViewType.calendar ? <CalendarView diaries={monthlyDiaries} />
              : <GraphView diaries={monthlyDiaries} symptoms={symptoms} />
          }
        </Section>
      </Main>
      <Modal show={diaryModalFormState.show} onBackgroundClicked={() => setDiaryModalFormState({ show: false })}>
        <ConditionForm onSubmit={onSubmit} symptoms={symptoms} />
      </Modal>
      <Dialog />
      <Toast />
    </Auth>
  );
}
