import React from "react";
import { Text } from "@chakra-ui/layout";

interface Props {
  size?: string | number;
  color?: string;
}

const Title: React.FC<Props> = ({
  children,
  color = "black",
  size = "3xl",
}) => {
  return (
    <Text fontSize={size} color={color}>
      {children}
    </Text>
  );
};

export default Title;
