import React, { memo, useEffect, useState } from 'react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderProps } from '@chakra-ui/react';
import { COLORS } from '../../../styles/theme';

export const areEqual = (prev: SliderProps, next: SliderProps): boolean => {
  if (prev.isDisabled !== next.isDisabled) {
    return false;
  }

  return true;
};

const Range = ({ max = 10, isDisabled = false, defaultValue = 0, onChange }: SliderProps): JSX.Element => {
  const [value, setValue] = useState(() => defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Slider max={max} isDisabled={isDisabled} value={value} onChange={(val) => setValue(val)}>
      <SliderTrack>
        <SliderFilledTrack bg={COLORS.primary} />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default memo(Range, areEqual);
