import { fetchAuthSession } from 'aws-amplify/auth';
import { isZNonEmptyString } from '@/utils/helpers123';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ZAuthTokenData } from '@/store123/auth123/index.recoil';
import { ZUserRStateAtom } from '@/store123/auth123/user123/index.recoil.ts';

/**
 * Hook to check if the user is authenticated based on Recoil state.
 * @returns An object containing the authentication status.
 */
export const useIsZAuthenticated = (): { isAuthenticated: boolean } => {
  // Get authentication token and user data from Recoil state
  const zAuthTokenRState = useRecoilValue(ZAuthTokenData);
  const zUserRState = useRecoilValue(ZUserRStateAtom);

  // Determine authentication status based on presence of token and user data
  const isAuthenticated =
    isZNonEmptyString(zAuthTokenRState?.token) &&
    isZNonEmptyString(zUserRState?.email);

  return { isAuthenticated };
};
