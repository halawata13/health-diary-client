import { User } from '../types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../config/environment';

/**
 * BaseService
 */
export default abstract class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor(user: User) {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }
}

export const getFetcher = (url: string, user: User | null) => {
  return () => axios.get(environment.apiUrl + url, getConfig(user)).then(res => res.data);
};

export const getConfig = (user: User | null): AxiosRequestConfig => {
  return user ? {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  } : {};
};
