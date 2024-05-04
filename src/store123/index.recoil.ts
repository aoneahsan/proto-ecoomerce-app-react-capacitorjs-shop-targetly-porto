import { atom } from 'recoil';
import { type ZAppViseBlockerI } from '@/types123/global123/index.type';
import { messages } from '@/utils/messages123';

export const zAppViseBlockerRStateAtom = atom<ZAppViseBlockerI>({
  key: 'zAppViseBlockerRStateAtom_key',
  default: {
    shouldBlock: false,
    messages: messages?.general?.blockReload
  }
});
