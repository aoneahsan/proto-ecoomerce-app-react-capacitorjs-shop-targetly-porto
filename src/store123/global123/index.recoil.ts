import { atom } from 'recoil';

import {
  type ZModalI,
  type ZLoaderI,
  type ZSidebarI,
  ZNetworkI
} from '@/types123/global123/index.type';
import { ZColorEnum } from '@/utils/enums123/Elements.enum';

export const ZSidebarRStateAtom = atom<ZSidebarI>({
  key: 'ZSidebarRStateAtom_Key',
  default: {
    isOpen: false,
    shouldBackdropClose: true
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

export const ZNetworkRStateAtom = atom<ZNetworkI>({
  key: 'ZNetworkRStateAtom_key',
  default: {
    status: {
      connected: true,
      connectionType: 'unknown'
    }
  }
});
