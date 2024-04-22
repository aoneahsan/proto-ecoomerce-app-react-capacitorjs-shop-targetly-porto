import { atom } from 'recoil';
import { type ZAppViseBlockerI } from '@/Types/Global/index.type';
import { messages } from '@/utils/Messages';

export const zAppViseBlockerRStateAtom = atom<ZAppViseBlockerI>({
  key: 'zAppViseBlockerRStateAtom_key',
  default: {
    shouldBlock: false,
    messages: messages?.general?.blockReload
  }
});
