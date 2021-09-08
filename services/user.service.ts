import axios from 'axios';
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

    return axios.post<User>(`${environment.baseUrl}/auth/login`, params).then(res => res.data);
  }

  public static save(user: User, useSessionStorage = true) {
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

  public static load(useSessionStorage = true) {
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

  public static delete(useSessionStorage = true): boolean {
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

  public static isLogin(useSessionStorage = true) {
    if (useSessionStorage) {
      return window.sessionStorage.getItem('user') !== null;
    } else {
      return window.localStorage.getItem('user') !== null;
    }
  }
}
