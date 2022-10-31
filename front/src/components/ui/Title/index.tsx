import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

const Title = ({ children, ...props }: TextProps): JSX.Element => (
  <Text size="3xl" {...props}>
    {children}
  </Text>
);

export default Title;
