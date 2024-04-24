// #region ---- Core Imports ----
import { ZRUButton } from '@/Components/RadixUI';
import { ZRUColorE } from '@/Types/radixUI/index.type';
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const TestingPage: React.FC = () => {
  return (
    <>
      <ZRUButton color={ZRUColorE.bronze} size={{ xl: '4', lg: '3', md: '2' }}>
        Test
      </ZRUButton>
    </>
  );
};

export default TestingPage;
