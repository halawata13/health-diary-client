import { atom } from 'recoil';
import { Diary } from '../types';

export interface DiaryFormModalStateType {
  show: boolean;
  params?: {
    condition: number;
  };
  diary?: Diary;
}

export const diaryFormModalState = atom<DiaryFormModalStateType>({
  key: 'DIARY_FORM_MODAL_STATE',
  default: {
    show: false,
  },
});
