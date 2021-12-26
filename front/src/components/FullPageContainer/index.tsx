import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface Props {
  direction?: FlexProps["direction"];
}

const FullPageContainer: React.FC<Props> = ({
  direction = "row",
  children,
}) => (
  <Flex
    height="100vh"
    justifyContent="center"
    alignItems="center"
    direction={direction}
  >
    {children}
  </Flex>
);

export default FullPageContainer;
