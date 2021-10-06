import BaseService from './base.service';
import { NewSymptom, Symptom } from '../types';
import { AxiosResponse } from 'axios';

export class SymptomService extends BaseService {
  public async create(symptom: NewSymptom) {
    return this.axiosInstance.post<NewSymptom, AxiosResponse<Symptom>>(`/symptom`, symptom).then(res => res.data);
  }

  public async update(symptom: Symptom) {
    return this.axiosInstance.put<Symptom, AxiosResponse<Symptom>>(`/symptom`, symptom).then(res => res.data);
  }

  public async delete(symptom: Symptom) {
    return this.axiosInstance.delete<Symptom, AxiosResponse<Symptom>>(`/symptom?id=${symptom.id}`).then(res => res.data);
  }
}
