import React from "react";
import { Text } from "@chakra-ui/layout";

interface Props {
  size?: string | number;
  color?: string;
}

const Title: React.FC<Props> = ({ children, color, size = "3xl" }) => {
  const textColor = color || "secondary";
  return (
    <Text fontSize={size} color={textColor}>
      {children}
    </Text>
  );
};

export default Title;
