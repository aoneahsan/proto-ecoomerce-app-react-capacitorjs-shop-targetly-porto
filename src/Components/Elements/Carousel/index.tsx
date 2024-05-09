// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import Carousel, { type CarouselProps } from 'react-multi-carousel';

// #endregion

const ZCarousel: React.FC<CarouselProps> = ({
  children,
  additionalTransfrom = 0,
  arrows = false,
  autoPlaySpeed = 3000,
  centerMode = false,
  className,
  containerClass = 'z-rmc-container',
  dotListClass,
  draggable = true,
  focusOnSelect = false,
  infinite = true,
  itemClass,
  keyBoardControl = true,
  minimumTouchDrag = 80,
  pauseOnHover = true,
  renderArrowsWhenDisabled = false,
  renderButtonGroupOutside = false,
  renderDotsOutside = false,
  rewind = false,
  rewindWithAnimation = false,
  rtl = false,
  shouldResetAutoplay = true,
  showDots = true,
  sliderClass,
  slidesToSlide = 1,
  swipeable = true,
  responsive,
  customDot
}) => {
  return (
    <Carousel
      additionalTransfrom={additionalTransfrom}
      arrows={arrows}
      autoPlaySpeed={autoPlaySpeed}
      centerMode={centerMode}
      className={className}
      containerClass={containerClass}
      dotListClass={dotListClass}
      draggable={draggable}
      focusOnSelect={focusOnSelect}
      infinite={infinite}
      itemClass={itemClass}
      keyBoardControl={keyBoardControl}
      minimumTouchDrag={minimumTouchDrag}
      pauseOnHover={pauseOnHover}
      renderArrowsWhenDisabled={renderArrowsWhenDisabled}
      renderButtonGroupOutside={renderButtonGroupOutside}
      renderDotsOutside={renderDotsOutside}
      rewind={rewind}
      rewindWithAnimation={rewindWithAnimation}
      rtl={rtl}
      shouldResetAutoplay={shouldResetAutoplay}
      showDots={showDots}
      sliderClass={sliderClass}
      slidesToSlide={slidesToSlide}
      swipeable={swipeable}
      responsive={responsive}
      customDot={customDot}
    >
      {children}
    </Carousel>
  );
};

export default ZCarousel;
