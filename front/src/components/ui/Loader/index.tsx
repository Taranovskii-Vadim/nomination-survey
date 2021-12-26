import React from "react";
import { Spinner, SpinnerProps } from "@chakra-ui/react";

import { ColorType } from "../../../styles/types";

import FullPageContainer from "../../FullPageContainer";

interface Props extends SpinnerProps {
  color?: ColorType;
}

const Loader = ({ color = "primary", ...props }: Props): JSX.Element => (
  <FullPageContainer>
    <Spinner
      speed="1s"
      emptyColor="gray.200"
      size="xl"
      color={color}
      {...props}
    />
  </FullPageContainer>
);

export default Loader;
