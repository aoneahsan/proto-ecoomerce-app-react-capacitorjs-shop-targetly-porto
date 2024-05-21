// #region ---- Core Imports ----
import React from 'react';

// #endregion

const FetchRequiredAppDataHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <>{children}</>;
};

export default FetchRequiredAppDataHOC;
