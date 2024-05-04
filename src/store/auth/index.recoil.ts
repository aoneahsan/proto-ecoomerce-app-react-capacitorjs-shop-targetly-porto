import { atom, selector } from 'recoil';

//
import { type UserAuthTokenI } from '@/types/auth/index.type';
import constants from '@/utils/constants';
import { Storage, isZNonEmptyString } from '@/utils/helpers123';
import { ZUserRStateAtom } from './user/index.recoil';

export const ZAuthTokenData = atom<UserAuthTokenI | null>({
  key: 'ZAuthTokenData_Key',
  default: null
});

export const IsAuthenticatedRStateSelector = selector({
  key: 'IsAuthenticatedRStateSelector_key',
  get: async ({ get }) => {
    const authToken = get(ZAuthTokenData);
    const currentUser = get(ZUserRStateAtom);
    return (
      isZNonEmptyString(authToken?.token) &&
      isZNonEmptyString(currentUser?.email)
    );
  }
});
