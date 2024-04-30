// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import ZPublicNavMiddleBar from './MiddleBar';
import ZPublicNavTopBar from './TopBar';

// #endregion

// #region ---- Types Imports ----
interface ZPublicNavigationI {
  showMenuBtn?: boolean;
  menuBtnOnClickHandler?: () => void;
}
// #endregion

/**
 * Represents a navigation used in public page like home etc..
 */
const ZPublicNavigation: React.FC<ZPublicNavigationI> = ({
  showMenuBtn = true,
  menuBtnOnClickHandler
}) => {
  return (
    <header>
      {/* Top bar */}
      <ZPublicNavTopBar />

      {/* Middle bar */}
      <ZPublicNavMiddleBar
        showMenuBtn={showMenuBtn}
        menuBtnOnClickHandler={menuBtnOnClickHandler}
      />
    </header>
  );
};

export default ZPublicNavigation;
