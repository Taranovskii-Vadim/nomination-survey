import React from 'react';
import { IconType } from 'react-icons/lib';
import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react';

import { Size } from './types';
import { getBoxSize } from './helpers';

interface Props extends IconProps {
  as: IconType;
  size?: Size | number;
}

const Icon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === 'number' ? size : getBoxSize(size);

  return <ChakraIcon boxSize={boxSize} {...props} />;
};

export default Icon;
