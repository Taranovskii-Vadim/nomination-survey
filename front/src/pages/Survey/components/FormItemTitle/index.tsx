import React, { memo } from "react";
import { FormLabel } from "@chakra-ui/react";

import { firstLetterToUpperCase } from "../../../../utils";

interface Props {
  name: string;
  label: string;
}

export const areEqual = (prev: Props, next: Props): boolean =>
  prev.name === next.name;

const FormItemTitle = ({ name, label }: Props): JSX.Element => (
  <FormLabel htmlFor={name}>{firstLetterToUpperCase(label)}</FormLabel>
);

export default memo(FormItemTitle, areEqual);
