import { atom } from 'recoil';

import { type ZUserI, type ZAuthI } from '@/types123/auth123/index.type';

export const ZUserRStateAtom = atom<ZAuthI | ZUserI | null>({
  key: 'ZUserRStateAtom_Key',
  default: null
});
