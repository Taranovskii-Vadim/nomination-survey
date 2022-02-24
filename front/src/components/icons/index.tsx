import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";
import { GoBook } from "react-icons/go";
import { GiSightDisabled } from "react-icons/gi";
import { AiOutlineLock } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";
import { ImFire } from "react-icons/im";

import { getBoxSize } from "./helpers";
import { Size } from "./types";

interface Props extends IconProps {
  size?: Size | number;
}

export const SurveyIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={GoBook} {...props} />;
};

export const SunIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={FiSun} {...props} />;
};

export const MoonIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={FiMoon} {...props} />;
};

export const DisabledIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={GiSightDisabled} {...props} />;
};

export const LockIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={AiOutlineLock} {...props} />;
};

export const TickIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={MdOutlineDone} {...props} />;
};

export const FireIcon = ({ size, ...props }: Props): JSX.Element => {
  const boxSize = typeof size === "number" ? size : getBoxSize(size);
  return <Icon boxSize={boxSize} as={ImFire} {...props} />;
};
