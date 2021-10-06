import { Diary, DiaryCreateParams, DiaryUpdateParams } from '../types';
import BaseService from './base.service';
import { AxiosResponse } from 'axios';

/**
 * DiaryService
 */
export class DiaryService extends BaseService {
  public async create(diary: DiaryCreateParams) {
    return this.axiosInstance.post<DiaryCreateParams, AxiosResponse<Diary>>(`/diary`, diary).then(res => res.data);
  }

  public async update(diary: DiaryUpdateParams) {
    return this.axiosInstance.put<DiaryUpdateParams, AxiosResponse<Diary>>(`/diary`, diary).then(res => res.data);
  }
}
