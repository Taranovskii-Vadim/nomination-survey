import React from "react";
import { Icon } from "@chakra-ui/react";
import { GoBook } from "react-icons/go";

import { Size } from "./types";
import { getBoxSize } from "./helpers";

interface Props {
  size?: Size;
}

export const SurveyIconOutline = ({ size = "medium" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} as={GoBook} />;
};
