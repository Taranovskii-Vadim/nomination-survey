import React from "react";

import { Text, TextProps } from "@chakra-ui/layout";
import { ColorType } from "../../../styles/types";

interface Props extends TextProps {
  color?: ColorType;
}

const Title = ({ color = "black", children, ...props }: Props): JSX.Element => (
  <Text size="3xl" color={color} {...props}>
    {children}
  </Text>
);

export default Title;
