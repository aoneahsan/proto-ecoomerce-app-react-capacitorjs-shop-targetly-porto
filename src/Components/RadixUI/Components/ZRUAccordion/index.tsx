// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import * as Accordion from '@radix-ui/react-accordion';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

/**
 * A customized Radix According component.
 */
const ZRUAccordingGroup: React.FC<
  Accordion.AccordionSingleProps | Accordion.AccordionMultipleProps
> = (props) => {
  return (
    <Accordion.Root
      {...props}
      className={ZClassNames('z-ru-accordion-root', props?.className)}
    >
      {props?.children}
    </Accordion.Root>
  );
};

export default ZRUAccordingGroup;
