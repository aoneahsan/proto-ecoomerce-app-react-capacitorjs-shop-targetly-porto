import { atom } from 'recoil';

import {
  type ZModalI,
  type ZLoaderI,
  type ZSidebarI
} from '@/Types/Global/index.type';
import { ZColorEnum } from '@/utils/Enums/Elements.enum';

export const ZSidebarRStateAtom = atom<ZSidebarI>({
  key: 'ZSidebarRStateAtom_Key',
  default: {
    isOpen: false,
    shouldBackdropClose: false
  }
});

export const ZLoaderRStateAtom = atom<ZLoaderI>({
  key: 'ZLoaderRStateAtom_key',
  default: {
    isOpen: false
  }
});

export const ZModalRStateAtom = atom<ZModalI>({
  key: 'ZModalRStateAtom_key',
  default: {
    isOpen: false,
    color: ZColorEnum.dark
  }
});
