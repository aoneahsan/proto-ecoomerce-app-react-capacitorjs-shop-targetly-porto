// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import Slider, { type SliderProps } from 'rc-slider';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZRCSliderI extends SliderProps {}
// #endregion

const ZRCSlider: React.FC<ZRCSliderI> = (props) => {
  return <Slider {...props} />;
};

export default ZRCSlider;
