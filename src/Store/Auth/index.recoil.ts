import { atom, selector } from 'recoil';

//
import { type UserAuthTokenI } from '@/Types/Auth/index.type';
import constants from '@/utils/constants';
import { Storage, isZNonEmptyString } from '@/utils/Helpers';
import { ZUserRStateAtom } from './User';

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
