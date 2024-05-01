// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import classNames from 'classnames';
import constants from '@/utils/constants12';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Copyright: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={classNames(className, {
        'text-primary text-[0.875rem] font-roboto-regular font-normal tracking-[0.25px]':
          true
      })}
    >
      Copyright Nyuk.in |
      <a
        href={constants.externalSites.PUR}
        target='_blank'
        rel='noreferrer'
        className='px-1'
      >
        Participate in user research
      </a>
      |
      <a
        href={`mailto:${constants.externalSites.mailto}`}
        target='_blank'
        rel='noreferrer'
        className='ps-1'
      >
        Get in touch with support
      </a>
    </span>
  );
};

export default Copyright;
