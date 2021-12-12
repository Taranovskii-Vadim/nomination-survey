import React, { memo } from "react";
import { Textarea as ChakraTextarea, TextareaProps } from "@chakra-ui/react";

interface Props extends TextareaProps {}

const Textarea = ({ ...props }: Props): JSX.Element => {
  return <ChakraTextarea {...props} />;
};

export default memo(Textarea);
