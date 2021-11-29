import React from "react";
import { Flex } from "@chakra-ui/layout";

import { SurveyRenderItem } from "../../store/surveysStore/types";

import ElectionIcon from "../icons/ElectionIcon";

interface Props {
  status: SurveyRenderItem["status"];
  title: SurveyRenderItem["title"];
}

const SurveyCard = ({ status, title }: Props): JSX.Element => (
  <Flex justifyContent="center" alignItems="center" bg="tomato" height="80px">
    <ElectionIcon />
    {title}
  </Flex>
);

export default SurveyCard;
