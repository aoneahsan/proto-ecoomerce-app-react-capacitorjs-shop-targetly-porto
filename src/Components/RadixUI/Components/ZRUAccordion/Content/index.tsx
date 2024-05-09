// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import * as Accordion from '@radix-ui/react-accordion';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

/**
 * A customized Radix According Content component.
 */
const ZRUAccordionContent: React.FC<
  Accordion.AccordionContentProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={ZClassNames('z-ru-accordion-content', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className='z-ru-accordion-content-text'>{children}</div>
  </Accordion.Content>
));

export default ZRUAccordionContent;
