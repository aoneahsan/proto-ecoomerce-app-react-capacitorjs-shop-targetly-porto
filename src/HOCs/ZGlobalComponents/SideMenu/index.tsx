// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { ZSidebarRStateAtom } from '@/Store/ZGlobal/index.recoil';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const ZSideMenu: React.FC = () => {
  const [ZSidebarRState, setZSidebarRState] =
    useRecoilState(ZSidebarRStateAtom);
  const containerStyles = useMemo(
    () => ({
      width: ZSidebarRState.width
    }),
    [ZSidebarRState.width]
  );
  return (
    <div
      className={ZClassNames({
        'fixed top-0 right-0 z-10  bg-transparent transition-all ease-in-out duration-300 h-full w-full flex justify-end':
          true,
        'opacity-100 translate-x-0': ZSidebarRState?.isOpen,
        'opacity-0 translate-x-[100%]': ZSidebarRState?.isOpen === false
      })}
    >
      <div
        className={ZClassNames({
          'absolute top-0 left-0 w-full h-full bg-transparent z-2': true,
          'cursor-pointer': ZSidebarRState?.shouldBackdropClose
        })}
        onClick={() => {
          if (ZSidebarRState?.shouldBackdropClose === true) {
            setZSidebarRState((oldValues) => ({
              ...oldValues,
              isOpen: false
            }));
          }
        }}
      ></div>
      <div
        className={ZClassNames({
          'relative z-10 h-full p-5 shadow-lg bg-light': true,
          'maxSm:w-[75%!important] maxMd:w-1/2 xl:w-1/3': !isZNonEmptyString(
            ZSidebarRState.width
          )
        })}
        style={containerStyles}
      >
        {ZSidebarRState?.component !== undefined &&
        ZSidebarRState?.component !== null ? (
          <ZSidebarRState.component {...ZSidebarRState.componentProps} />
        ) : null}
      </div>
    </div>
  );
};

export default ZSideMenu;
