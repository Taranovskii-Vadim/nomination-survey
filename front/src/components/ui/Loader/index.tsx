import React from "react";
import { Spinner, SpinnerProps, Text } from "@chakra-ui/react";

import { ColorType } from "../../../styles/types";

import FullPageContainer from "../../FullPageContainer";

interface Props extends SpinnerProps {
  text?: string;
  color?: ColorType;
}

const Loader = ({ color = "primary", text, ...props }: Props): JSX.Element => (
  <FullPageContainer>
    <Spinner
      speed="1s"
      emptyColor="gray.200"
      size="xl"
      color={color}
      {...props}
    />
    {Text ? <Text>{text}</Text> : null}
  </FullPageContainer>
);

export default Loader;
