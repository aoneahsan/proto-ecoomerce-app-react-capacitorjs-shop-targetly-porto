// #region ---- Core Imports ----
import React, { useEffect, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { ZRUScrollArea } from '@/components/RadixUI';
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { ZRUScrollbarsE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZSidebarRStateAtom } from '@/store/global/index.recoil';

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

  useEffect(() => {
    if (ZSidebarRState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ZSidebarRState.isOpen]);

  return (
    <div
      className={ZClassNames({
        'fixed top-0 right-0 z-10  bg-transparent transition-all ease-in-out duration-300 h-full w-full flex justify-start':
          true,
        'opacity-100 translate-x-0': ZSidebarRState?.isOpen,
        'opacity-0 -translate-x-[100%]': ZSidebarRState?.isOpen === false
      })}
    >
      <div
        className={ZClassNames({
          'absolute top-0 left-0 w-full h-full z-2': true,
          'bg-transparent': !ZSidebarRState?.shouldBackdropClose,
          'cursor-pointer bg-[rgba(0,0,0,0.4)]':
            ZSidebarRState?.shouldBackdropClose
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
          'relative z-10 h-full shadow-lg bg-white': true,
          'maxSm:w-[75%!important] maxMd:w-1/2 xl:w-1/3': !isZNonEmptyString(
            ZSidebarRState.width
          )
        })}
        style={containerStyles}
      >
        <ZRUScrollArea scrollbars={ZRUScrollbarsE.vertical} className='p-5'>
          {ZSidebarRState?.component !== undefined &&
          ZSidebarRState?.component !== null ? (
            <ZSidebarRState.component {...ZSidebarRState.componentProps} />
          ) : null}
        </ZRUScrollArea>
      </div>
    </div>
  );
};

export default ZSideMenu;
