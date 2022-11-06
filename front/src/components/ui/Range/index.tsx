import React, { memo } from 'react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderProps } from '@chakra-ui/react';

import { COLORS } from 'src/styles/theme';

export const areEqual = (prev: SliderProps, next: SliderProps): boolean => {
  if (prev.isDisabled !== next.isDisabled) {
    return false;
  }

  return true;
};

const Range = ({ isDisabled = false, onChange }: SliderProps): JSX.Element => (
  <Slider max={10} isDisabled={isDisabled} onChange={onChange}>
    <SliderTrack>
      <SliderFilledTrack bg={COLORS.primary} />
    </SliderTrack>
    <SliderThumb />
  </Slider>
);

export default memo(Range, areEqual);
