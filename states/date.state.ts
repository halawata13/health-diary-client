import { atom } from 'recoil';
import { DateTime } from 'luxon';

export interface DateState {
  selected: DateTime;
}

export const dateState = atom<DateTime>({
  key: 'DATE_STATE',
  default: DateTime.now(),
});
