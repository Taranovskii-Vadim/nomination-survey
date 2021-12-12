import React, { memo } from "react";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

interface Props extends InputProps {}

const Input = ({ ...props }: Props): JSX.Element => {
  return <ChakraInput {...props} />;
};

export default memo(Input);
