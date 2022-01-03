import React from "react";
import { Spinner, SpinnerProps, Text } from "@chakra-ui/react";

import { ColorType } from "../../../styles/types";

import FullPageContainer from "../../FullPageContainer";

interface Props extends SpinnerProps {
  text?: string;
  color?: ColorType;
  containerHeight?: string;
}

const Loader = ({
  color = "primary",
  containerHeight,
  text,
  ...props
}: Props): JSX.Element => (
  <FullPageContainer height={containerHeight}>
    <Spinner
      speed="1s"
      emptyColor="gray.200"
      size="xl"
      color={color}
      {...props}
    />
    {text ? <Text>{text}</Text> : null}
  </FullPageContainer>
);

export default Loader;
