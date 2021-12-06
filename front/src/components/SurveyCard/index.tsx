import React from "react";
import { Flex } from "@chakra-ui/layout";

import { SurveyRenderItem } from "../../store/surveysStore/types";

import { SurveyIconOutline } from "../icons";

interface Props {
  title: SurveyRenderItem["title"];
  isActive: boolean;
}

// TODO if not active main color is grey overwise is main

const SurveyCard = ({ title, isActive }: Props): JSX.Element => (
  <Flex
    cursor={isActive ? "pointer" : "not-allowed"}
    border="1px solid black"
    borderRadius="5px"
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="80px"
  >
    <SurveyIconOutline size="large" />
    {title}
    {isActive ? "active" : "not active"}
  </Flex>
);

export default SurveyCard;
