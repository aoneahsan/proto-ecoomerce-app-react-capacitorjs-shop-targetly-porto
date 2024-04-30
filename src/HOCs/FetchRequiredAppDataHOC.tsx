// #region ---- Core Imports ----
import React, { useCallback, useEffect } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useSetRecoilState } from 'recoil';
import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession
} from 'aws-amplify/auth';

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/Constants';
import { Storage, isZNonEmptyString } from '@/utils/Helpers';
import { zAxiosApiRequest } from '@/utils/Helpers/APIS';

// #endregion

// #region ---- Types Imports ----
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZAuthTokenData } from '@/Store/Auth/index.recoil';

// #endregion

// #region ---- Images Imports ----

// #endregion

const FetchRequiredAppDataHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // #region Recoil
  const setZUserRStateAtom = useSetRecoilState(ZUserRStateAtom);

  const setZAuthTokenRStateAtom = useSetRecoilState(ZAuthTokenData);
  // #endregion

  // #region Functions

  const getAndStoreUserData = useCallback(async () => {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    if (
      isZNonEmptyString(accessToken?.toString()) &&
      isZNonEmptyString(idToken?.toString())
    ) {
      const _userAttribute = await fetchUserAttributes();
      const _userData = await getCurrentUser();

      if (
        _userAttribute !== null &&
        _userAttribute !== undefined &&
        _userData !== null &&
        _userData !== undefined
      ) {
        const _data = {
          id: _userData?.userId,
          username: _userData?.username,
          ..._userAttribute
        };

        // Storing user data in user Recoil State.
        setZUserRStateAtom((oldValues) => ({
          ...oldValues,
          ..._data
        }));

        setZAuthTokenRStateAtom((oldValues) => ({
          ...oldValues,
          token: idToken?.toString(),
          accessToken: accessToken?.toString()
        }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

  // #region useEffects
  useEffect(() => {
    void getAndStoreUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

  return <>{children}</>;
};

export default FetchRequiredAppDataHOC;
