import { useMediaQuery } from 'react-responsive';
import constants from '@/utils/Constants';
import { type useZMediaQueryScaleReturnInterface } from '@/Types/Global/index.type';

/**
 * A custom hook to determine the media query scale of the screen.
 * @returns an object with boolean values for each defined media scale.
 */
export const useZMediaQueryScale = (): useZMediaQueryScaleReturnInterface => {
  // Check if the screen width is at 2 extra-large (sxl) scale
  const is2XlScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_2xl})`
  });

  const isBelow2XlScale = useMediaQuery({
    query: `(max-width: ${constants.mediaScales.brackpoint_2xl})`
  });

  // Check if the screen width is at extra-large (xl) scale
  const isXlScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_xl})`
  });

  // Check if the screen width is at 1300px scale
  const is1300pxScale = useMediaQuery({
    query: '(min-width: 1300px)'
  });

  // Check if the screen width is at 1250px scale
  const is1250pxScale = useMediaQuery({
    query: '(min-width: 1250px)'
  });

  // Check if the screen width is at 1200px scale
  const is1200pxScale = useMediaQuery({
    query: '(min-width: 1200px)'
  });

  // Check if the screen width is at 1150px scale
  const is1150pxScale = useMediaQuery({
    query: '(min-width: 1150px)'
  });

  // Check if the screen width is at 1100px scale
  const is1100pxScale = useMediaQuery({
    query: '(min-width: 1100px)'
  });

  // Check if the screen width is at large (lg) scale
  const isLgScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_lg})`
  });

  // Check if the screen width is at medium (md) scale
  const isMdScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_md})`
  });

  // Check if the screen width is at small (sm) scale
  const isSmScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_sm})`
  });

  // Check if the screen width is at extra small (xs) scale
  const isXsScale = useMediaQuery({
    query: `(min-width: ${constants.mediaScales.brackpoint_xs})`
  });

  return {
    is2XlScale,
    isBelow2XlScale,
    isXlScale,
    isLgScale,
    isMdScale,
    isSmScale,
    isXsScale,
    is1300pxScale,
    is1200pxScale,
    is1250pxScale,
    is1150pxScale,
    is1100pxScale
  };
};
