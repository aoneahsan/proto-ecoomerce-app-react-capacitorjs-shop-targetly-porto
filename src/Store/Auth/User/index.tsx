import { atom } from 'recoil';

import { type ZAuthI } from '@/Types/Auth/index.type';

export const ZUserRStateAtom = atom<ZAuthI | null>({
  key: 'ZUserRStateAtom_Key',
  default: null
});
