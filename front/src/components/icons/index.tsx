import React from "react";
import { Icon } from "@chakra-ui/react";
import { GoBook } from "react-icons/go";
import { GiSightDisabled } from "react-icons/gi";

import { Size } from "../types";
import { getBoxSize } from "./helpers";

interface Props {
  size?: Size;
  color?: string;
}

export const SurveyIconOutline = ({
  size = "medium",
  color = "black",
}: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GoBook} />;
};

export const SurveyUnActive = ({ size, color }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GiSightDisabled} />;
};
