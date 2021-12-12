import React, { memo } from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  label: string;
}

export const areEqual = (prev: Props, next: Props): boolean => {
  if (prev.label === next.label) {
    return false;
  }

  if (prev.isLoading === next.isLoading) {
    return false;
  }

  return true;
};

const Button = ({ label, ...props }: Props): JSX.Element => {
  return <ChakraButton {...props}>{label}</ChakraButton>;
};

export default memo(Button, areEqual);
