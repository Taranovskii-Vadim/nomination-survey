import React, { memo } from 'react';
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';

const Textarea = ({ ...props }: TextareaProps): JSX.Element => {
  return <ChakraTextarea {...props} />;
};

export default memo(Textarea);
