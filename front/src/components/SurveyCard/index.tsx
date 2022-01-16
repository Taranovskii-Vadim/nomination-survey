import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { useDrag, useDrop } from "react-dnd";

import { COLORS } from "../../styles/constants";
import { SurveyRenderItem } from "../../store/surveysStore/types";
import { firstLetterToUpperCase } from "../../utils";

import { SurveyIcon, DisabledIcon } from "../icons";

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

  return (
    <Flex
      ref={drag}
      cursor={isActive ? "pointer" : "not-allowed"}
      height="100%"
      p="10px"
      borderRadius="5px"
      border={
        isActive
          ? `1px solid ${COLORS.primary}`
          : `1px dashed ${COLORS.secondary}`
      }
      direction="column"
      alignItems="center"
      textAlign="center"
    >
      <ComponentIcon size="large" color={isActive ? "primary" : "secondary"} />
      <Text fontSize="xl" color="secondary" flexGrow={1}>
        {isActive ? firstLetterToUpperCase(title) : unActiveMessage}
      </Text>
    </Flex>
  );
};

export default SurveyCard;
