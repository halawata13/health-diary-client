import axios, { AxiosResponse } from 'axios';
import { User } from '../types';
import { environment } from '../config/environment';

/**
 * UserService
 */
export class UserService {
  public static async login(username: string, password: string) {
    const params = {
      username,
      password,
    };
    type Params = typeof params;

    return axios.post<Params, AxiosResponse<User>>(`${environment.apiUrl}/auth/login`, params).then(res => res.data);
  }

  public static save(user: User, useSessionStorage = false) {
    try {
      if (useSessionStorage) {
        window.sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        window.localStorage.setItem('user', JSON.stringify(user));
      }

      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static load(useSessionStorage = false) {
    try {
      if (useSessionStorage) {
        const json = window.sessionStorage.getItem('user');
        return json ? JSON.parse(json) as User : null;
      } else {
        const json = window.localStorage.getItem('user');
        return json ? JSON.parse(json) as User : null;
      }

    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static delete(useSessionStorage = false): boolean {
    try {
      if (useSessionStorage) {
        window.sessionStorage.removeItem('user');
      } else {
        window.localStorage.removeItem('user');
      }

      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
