import { atom } from 'recoil';

import { type ZUserI, type ZAuthI } from '@/Types/Auth/index.type';

export const ZUserRStateAtom = atom<ZAuthI | ZUserI | null>({
  key: 'ZUserRStateAtom_Key',
  default: null
});
