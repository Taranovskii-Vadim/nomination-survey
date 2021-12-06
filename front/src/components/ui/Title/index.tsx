import React from "react";
import { Text } from "@chakra-ui/layout";

interface Props {
  color?: string;
}

const Title: React.FC<Props> = ({ children, color }) => {
  const textColor = color || "gray.500";
  return (
    <Text fontSize="3xl" color={textColor}>
      {children}
    </Text>
  );
};

export default Title;
