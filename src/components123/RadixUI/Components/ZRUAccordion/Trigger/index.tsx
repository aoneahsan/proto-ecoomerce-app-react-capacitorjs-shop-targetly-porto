// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import * as Accordion from '@radix-ui/react-accordion';
import { ZClassNames } from '@/Packages/ClassNames';
import { ZChevronDown } from '@/assets';

// #endregion

/**
 * A customized Radix According Trigger component.
 */
const ZRUAccordionTrigger: React.FC<
  Accordion.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className='z-ru-accordion-header'>
    <Accordion.Trigger
      className={ZClassNames('z-ru-accordion-trigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ZChevronDown className='z-ru-accordion-content-chevron' aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

export default ZRUAccordionTrigger;
