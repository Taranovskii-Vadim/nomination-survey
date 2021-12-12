import React, { memo } from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  label: string;
}

export const areEqual = (prev: Props, next: Props): boolean => {
  return prev.label === next.label || prev.isLoading === next.isLoading;
};

const Button = ({ label, ...props }: Props): JSX.Element => {
  return <ChakraButton {...props}>{label}</ChakraButton>;
};

export default memo(Button, areEqual);
