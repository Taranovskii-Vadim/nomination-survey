import React, { ReactNode } from "react";

import { Text, TextProps } from "@chakra-ui/layout";

interface Props extends TextProps {
  label: string | ReactNode;
}

const Title = ({
  label,
  color = "black",
  size = "3xl",
  ...props
}: Props): JSX.Element => {
  return (
    <Text fontSize={size} color={color} {...props}>
      {label}
    </Text>
  );
};

export default Title;
