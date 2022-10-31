import React, { memo } from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

const Input = ({ ...props }: InputProps): JSX.Element => {
  return <ChakraInput {...props} />;
};

export default memo(Input);
