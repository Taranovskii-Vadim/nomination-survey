import React from "react";
import { Flex } from "@chakra-ui/layout";

import { SurveyRenderItem } from "../../store/surveysStore/types";
import { firstLetterToUpperCase } from "../../utils";

import { SurveyIconOutline } from "../icons";
import Title from "../ui/Title";

interface Props {
  title: SurveyRenderItem["title"];
  isActive: boolean;
}

// TODO if not active main color is grey overwise is main

const SurveyCard = ({ title, isActive }: Props): JSX.Element => (
  <Flex
    borderRadius="5px"
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="80px"
    textAlign="center"
  >
    <SurveyIconOutline size="large" />
    <Title size="xl">{firstLetterToUpperCase(title)}</Title>
  </Flex>
);

export default SurveyCard;
