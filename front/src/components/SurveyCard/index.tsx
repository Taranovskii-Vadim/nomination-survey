import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { useDrag } from "react-dnd";

import { SurveyRenderItem } from "../../store/surveysStore/types";
import { firstLetterToUpperCase } from "../../utils";

import { SurveyIcon, DisabledIcon } from "../icons";
import { COLORS } from "../../styles/theme";

interface Props {
  id: string;
  title: SurveyRenderItem["title"];
  isActive: boolean;
  unActiveMessage?: string;
}

// TODO think about how split childs efficiently

const SurveyCard = ({
  id,
  title,
  isActive,
  unActiveMessage = "Не активно",
}: Props): JSX.Element => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: id,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const ComponentIcon = isActive ? SurveyIcon : DisabledIcon;
  const iconColor = COLORS[isActive ? "primary" : "gray"];

  return (
    <Flex
      ref={drag}
      cursor={isActive ? "pointer" : "not-allowed"}
      height="100%"
      p="10px"
      borderRadius="5px"
      border="1px"
      borderStyle={isActive ? "solid" : "dashed"}
      borderColor={iconColor}
      direction="column"
      alignItems="center"
      textAlign="center"
    >
      <ComponentIcon size="large" color={iconColor} />
      <Text fontSize="xl" flexGrow={1}>
        {isActive ? firstLetterToUpperCase(title) : unActiveMessage}
      </Text>
    </Flex>
  );
};

export default SurveyCard;
