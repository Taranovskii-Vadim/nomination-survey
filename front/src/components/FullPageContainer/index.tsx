import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface Props {
  height?: string;
  direction?: FlexProps['direction'];
}

const FullPageContainer: React.FC<Props> = ({ direction = 'column', height = '100vh', children }) => (
  <Flex height={height} justifyContent="center" alignItems="center" direction={direction}>
    {children}
  </Flex>
);

export default FullPageContainer;
