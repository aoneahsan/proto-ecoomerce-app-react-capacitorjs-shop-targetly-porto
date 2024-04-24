import { atom, selector } from 'recoil';

//
import { type UserAuthTokenI } from '@/Types/Auth/index.type';
import constants from '@/utils/Constants';
import { Storage } from '@/utils/Helpers';
import { ZUserRStateAtom } from './User';

export const ZAuthTokenData = atom<UserAuthTokenI | null>({
  key: 'ZAuthTokenData_Key',
  default: null
});

export const IsAuthenticatedRStateSelector = selector({
  key: 'IsAuthenticatedRStateSelector_key',
  get: async ({ get }) => {
    const authToken = (await Storage.get(
      constants.localstorageKeys.authToken
    )) as string | null;
    const currentUser = get(ZUserRStateAtom);
    return (
      authToken !== null &&
      authToken?.trim()?.length > 0 &&
      currentUser?.email !== null
    );
  }
});
