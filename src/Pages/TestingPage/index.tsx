// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUButton, ZRUContainer, ZRUSelect } from '@/Components/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { ZRUColorE } from '@/Types/radixUI/index.type';

// #endregion

const TestingPage: React.FC = () => {
  return (
    <ZRUContainer>
      <ZRUButton color={ZRUColorE.bronze} size={{ xl: '4', lg: '3', md: '2' }}>
        Test
      </ZRUButton>
      <ZRUSelect
        trigger={{
          placeholder: 'Select a value'
        }}
      />
    </ZRUContainer>
  );
};

export default TestingPage;
