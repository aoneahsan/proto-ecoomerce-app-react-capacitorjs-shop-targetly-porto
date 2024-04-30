// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import ZReactHelmet, {
  type ZReactHelmetI
} from '@/Components/Utility/ZReactHelmet';

// #endregion

// #region ---- Types Imports ----
interface IZPage {
  children?: React.ReactNode;
  className?: string;
  helmet?: ZReactHelmetI;
}

/**
 * Represents a generic page layout component.
 *
 * @param className - Additional CSS classes to be applied to the page container.
 * @param helmet - Optional metadata for the document head provided through ReactHelmet.
 */
const ZPage: React.FC<IZPage> = ({ children, className, helmet }) => {
  return (
    <div
      className={ZClassNames('w-full min-h-screen overflow-hidden', className)}
    >
      <ZReactHelmet {...helmet} />
      {children}
    </div>
  );
};

export default ZPage;
