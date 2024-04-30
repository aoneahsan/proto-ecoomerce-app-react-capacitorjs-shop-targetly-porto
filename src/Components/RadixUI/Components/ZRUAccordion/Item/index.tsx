// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import * as Accordion from '@radix-ui/react-accordion';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

/**
 * A customized Radix According Item component.
 */
const ZRUAccordionItem: React.FC<
  Accordion.AccordionItemProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return (
    <Accordion.Item
      {...props}
      className={ZClassNames('z-ru-accordion-item', props?.className)}
    >
      {props?.children}
    </Accordion.Item>
  );
};

export default ZRUAccordionItem;
