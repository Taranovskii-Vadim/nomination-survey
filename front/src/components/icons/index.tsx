import React from "react";
import { Icon } from "@chakra-ui/react";
import { GoBook } from "react-icons/go";
import { GiSightDisabled } from "react-icons/gi";
import { AiOutlineLock } from "react-icons/ai";

import { ColorType } from "../../styles/types";
import { getBoxSize } from "./helpers";
import { Size } from "./types";

interface Props {
  size?: Size;
  color?: ColorType;
}

export const SurveyIconOutline = ({
  size = "medium",
  color = "black",
}: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GoBook} />;
};

export const SurveyUnActive = ({
  size,
  color = "black",
}: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GiSightDisabled} />;
};

export const SurveyLockIcon = ({
  size,
  color = "black",
}: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={AiOutlineLock} />;
};
