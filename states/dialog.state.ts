import { atom } from 'recoil';

export interface DialogStateType {
  show: boolean;
  title?: string;
  message?: string;
  onOkClicked?: () => void;
  onNgClicked?: () => void;
}

export const initialDialogState: DialogStateType = {
  show: false,
};

export const dialogState = atom<DialogStateType>({
  key: 'DIALOG_STATE',
  default: initialDialogState,
});
