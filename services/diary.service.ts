import { Diary, DiaryCreateParams, DiaryUpdateParams } from '../types';
import BaseService from './base.service';

/**
 * DiaryService
 */
export class DiaryService extends BaseService {
  public async create(diary: DiaryCreateParams) {
    return this.axiosInstance.post<Diary>(`/diary`, diary).then(res => res.data);
  }

  public async update(diary: DiaryUpdateParams) {
    return this.axiosInstance.put<Diary>(`/diary`, diary).then(res => res.data);
  }
}
