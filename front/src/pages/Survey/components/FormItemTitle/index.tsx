import React, { memo } from "react";
import { FormLabel } from "@chakra-ui/react";

import { firstLetterToUpperCase } from "../../../../utils";

interface Props {
  id: number;
  label: string;
}

export const areEqual = (prev: Props, next: Props): boolean =>
  prev.id === next.id;

const FormItemTitle = ({ id, label }: Props): JSX.Element => (
  <FormLabel htmlFor={id.toString()}>{firstLetterToUpperCase(label)}</FormLabel>
);

export default memo(FormItemTitle, areEqual);
