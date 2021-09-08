import { DateTime } from 'luxon';

export interface User {
  id: number;
  name: string;
  accessToken: string;
}

export interface Symptom {
  id: number;
  name: string;
  color: Color;
  isDeletable?: boolean
}

export const colors = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey',
] as const;

export type Color = typeof colors[number];

export type NewSymptom = Omit<Symptom, 'id'>;

export interface Diary {
  id: number;
  memo: string;
  condition: number;
  date: DateTime;
  symptoms: DiarySymptom[];
}

export interface DiaryNoData {
  date: DateTime;
}

export type NewDiary = Omit<Diary, 'id'>;

export interface DiarySymptom {
  id: number;
  symptomId: number;
  level: number;
  symptom: Symptom;
}

export interface DiaryUpdateParams {
  id: number;
  memo: string;
  condition: number;
  date: string;
  symptoms: {
    symptomId?: number;
    level: number;
    name: string;
    color?: string;
  }[];
  deleteSymptoms: {
    id: number;
  }[];
}

export type DiaryCreateParams = Omit<DiaryUpdateParams, 'id'>;
