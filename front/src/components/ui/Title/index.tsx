import React from "react";

import { Text, TextProps } from "@chakra-ui/layout";

interface Props extends TextProps {}

const Title = ({ children, ...props }: Props): JSX.Element => (
  <Text size="3xl" {...props}>
    {children}
  </Text>
);

export default Title;
