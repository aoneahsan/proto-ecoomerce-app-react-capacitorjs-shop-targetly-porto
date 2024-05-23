// #region ---- Core Imports ----
import React, { useState } from 'react';
// #endregion

// #region ---- Custom Imports ----
import { ZRUBox } from '@/components/RadixUI';
import { ZPage } from '@/components/Elements';
import ZPublicNavTopBar from '@/components/common/Navigation/TopBar';
import { reportCustomError } from '@/utils/helpers';
// #endregion

// #region ---- Store Imports ----
import {
  _createUserWithEmailAndPassword,
  _firebaseAuth
} from '@/configs/firebase/frbAuth';
import {
  UserCredential,
  getIdToken,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useZRQCreateRequest } from '@/hooks/zreactquery.hooks';
import { ApiUrlEnum } from '@/utils/enums/apis.enum';

// #endregion

const Login: React.FC = () => {
  const [compState, setCompState] = useState<{
    currentUser: UserCredential | null;
    currentUserIdTokenJWT: string | null;
  }>({
    currentUser: null,
    currentUserIdTokenJWT: null
  });

  const { mutateAsync: mutateTestPostRequest } = useZRQCreateRequest({
    _url: ApiUrlEnum.testPost
  });

  const testSignUp = async () => {
    const _createUserWithEmailAndPasswordRes =
      await _createUserWithEmailAndPassword('aoneahsan@gmail.com', 'Asd123!@#');
    console.log({
      ml: 'testSignUp called',
      _createUserWithEmailAndPasswordRes
    });

    setCompState((oldState) => ({
      ...oldState,
      currentUser: _createUserWithEmailAndPasswordRes
    }));
  };

  const textGetUserAuthTokenAndHitAPI = async () => {
    try {
      if (!compState?.currentUser || !compState?.currentUser?.user) {
        throw new Error('User not found');
      } else {
        const getIdTokenRes = await getIdToken(compState?.currentUser?.user);

        const mutateTestPostRequestRes = await mutateTestPostRequest(
          JSON.stringify({
            data: 'okay from frontend'
          })
        );

        console.log({
          ml: 'textGetUserAuthTokenAndHitAPI called',
          getIdTokenRes,
          mutateTestPostRequestRes
        });
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const textSignInWithEmailAndPassword = async () => {
    const signInWithEmailAndPasswordRes = await signInWithEmailAndPassword(
      _firebaseAuth,
      'aoneahsan@gmail.com',
      'Asd123!@#'
    );
    console.log({
      ml: 'textSignInWithEmailAndPassword called',
      signInWithEmailAndPasswordRes
    });

    setCompState((oldState) => ({
      ...oldState,
      currentUser: signInWithEmailAndPasswordRes
    }));
  };

  return (
    <ZPage className='relative flex-col w-full min-h-screen bg-light h max-h-max'>
      {/* Navigation */}
      <ZPublicNavTopBar />

      <ZRUBox className='flex flex-col items-center w-full h-full max-w-full mt-6'>
        <ZRUBox className='pt-3 mt-10 w-full sm:w-[25.5625rem] text-start px-1 sm:ps-4'>
          <button
            onClick={testSignUp}
            className='px-4 py-3 mb-4 mr-4 text-white bg-primary'
          >
            testSignUp
          </button>
          <button
            onClick={textGetUserAuthTokenAndHitAPI}
            className='px-4 py-3 mb-4 mr-4 text-white bg-primary'
          >
            textGetUserAuthTokenAndHitAPI
          </button>
          <button
            onClick={textSignInWithEmailAndPassword}
            className='px-4 py-3 mb-4 mr-4 text-white bg-primary'
          >
            textSignInWithEmailAndPassword
          </button>
        </ZRUBox>
      </ZRUBox>
    </ZPage>
  );
};

export default Login;
