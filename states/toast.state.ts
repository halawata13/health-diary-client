import { atom } from 'recoil';

export enum ToastMessageType {
  info,
  success,
  warning,
  error,
}

export interface ToastStateType {
  show: boolean,
  message: string,
  type: ToastMessageType,
}

export const toastState = atom<ToastStateType>({
  key: 'TOAST_STATE',
  default: {
    show: false,
    message: '',
    type: ToastMessageType.info,
  },
});
