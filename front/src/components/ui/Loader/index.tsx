import React from "react";
import { Spinner, SpinnerProps, Text } from "@chakra-ui/react";

import FullPageContainer from "../../FullPageContainer";

interface Props extends SpinnerProps {
  text?: string;
  containerHeight?: string;
}

const Loader = ({ containerHeight, text, ...props }: Props): JSX.Element => (
  <FullPageContainer height={containerHeight}>
    <Spinner speed="1s" emptyColor="gray.200" size="xl" {...props} />
    {text ? <Text>{text}</Text> : null}
  </FullPageContainer>
);

export default Loader;
