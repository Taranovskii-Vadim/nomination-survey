import React from "react";
import { Icon } from "@chakra-ui/react";
import { GoBook } from "react-icons/go";
import { GiSightDisabled } from "react-icons/gi";
import { AiOutlineLock } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { ImFire } from "react-icons/im";

import { getBoxSize } from "./helpers";
import { Size } from "./types";

interface Props {
  size?: Size;
  color?: string;
}

export const SurveyIcon = ({ size, color = "black" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GoBook} />;
};

export const DisabledIcon = ({ size, color = "black" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={GiSightDisabled} />;
};

export const LockIcon = ({ size, color = "black" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={AiOutlineLock} />;
};

export const TickIcon = ({ size, color = "black" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={MdOutlineDone} />;
};

export const FireIcon = ({ size, color = "black" }: Props): JSX.Element => {
  const boxSize = getBoxSize(size);
  return <Icon boxSize={boxSize} color={color} as={ImFire} />;
};
