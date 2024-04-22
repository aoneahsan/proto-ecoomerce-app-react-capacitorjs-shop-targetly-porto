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
import { ZModalRStateAtom } from '@/Store/ZGlobal/index.recoil';
import { ZColorEnum } from '@/utils/Enums/Elements.enum';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const ZModal: React.FC = () => {
  const [ZModalRState, setZModalRState] = useRecoilState(ZModalRStateAtom);

  const containerStyles = useMemo(
    () => ({
      width: ZModalRState.width,
      height: ZModalRState.height
    }),
    [ZModalRState.width, ZModalRState.height]
  );

  return (
    <div
      className={ZClassNames({
        'fixed top-1/2 left-1/2 w-full h-full -translate-x-1/2 bg-transparent -translate-y-1/2 transition-all ease-in-out duration-100 flex justify-center items-center flex-col':
          true,
        'opacity-100 scale-100 z-10': ZModalRState?.isOpen,
        'opacity-0 scale-0 z-0': ZModalRState?.isOpen === false
      })}
    >
      <div
        className={ZClassNames({
          'absolute inset-0 z-10 w-full h-full opacity-95': true,
          'bg-dark': ZModalRState.color === ZColorEnum.dark,
          'bg-primary': ZModalRState.color === ZColorEnum.primary,
          'bg-secondary': ZModalRState.color === ZColorEnum.secondary,
          'bg-medium': ZModalRState.color === ZColorEnum.medium,
          'bg-tertiary': ZModalRState.color === ZColorEnum.tertiary,
          'cursor-pointer': ZModalRState?.shouldBackdropClose
        })}
        onClick={() => {
          if (ZModalRState?.shouldBackdropClose === true) {
            setZModalRState((oldValues) => ({
              ...oldValues,
              isOpen: false
            }));
          }
        }}
      ></div>
      <div
        className={ZClassNames(ZModalRState?.containerClassName, {
          'relative z-20 h-full shadow-lg bg-light rounded-lg': true,
          'maxSm:w-[75%!important] maxMd:w-1/2 xl:w-1/3 max-w-[50rem]':
            !isZNonEmptyString(ZModalRState?.width),
          'maxSm:h-[75%!important] maxMd:h-1/2 xl:h-2/3 max-h-[50rem]':
            !isZNonEmptyString(ZModalRState?.height)
        })}
        style={containerStyles}
      >
        {ZModalRState?.component !== undefined &&
        ZModalRState?.component !== null ? (
          <ZModalRState.component {...ZModalRState?.componentProps} />
        ) : null}
      </div>
    </div>
  );
};

export default ZModal;
