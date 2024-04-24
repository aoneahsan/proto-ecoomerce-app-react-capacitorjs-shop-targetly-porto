// #region ---- Core Imports ----
import React, { useEffect } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useSetRecoilState } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/Constants';
import { Storage } from '@/utils/Helpers';
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

  // #region useEffects
  useEffect(() => {
    void (async () => {
      await Promise.all([
        Storage.get(constants.localstorageKeys.authToken),
        Storage.get(constants.localstorageKeys.userData)
      ]).then(async ([authToken, userData]) => {
        if (authToken !== undefined && userData !== undefined) {
          // check api result
          await zAxiosApiRequest({
            _url: ApiUrlEnum.verifyAuthenticationStatus,
            _method: 'post'
          });

          setZUserRStateAtom((oldValues) => ({
            ...oldValues,
            ...userData
          }));

          setZAuthTokenRStateAtom((oldValues) => ({
            ...oldValues,
            token: authToken as string
          }));
        }
      });
    })();
    // eslint-disable-next-line
  }, []);

  // #endregion

  return <>{children}</>;
};

export default FetchRequiredAppDataHOC;
