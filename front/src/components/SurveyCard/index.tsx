import React from "react";
// import { useDrag } from "react-dnd";
import { Flex, Text } from "@chakra-ui/layout";
import { AiOutlineLock } from "react-icons/ai";
import { GiSightDisabled } from "react-icons/gi";

import { firstLetterToUpperCase } from "../../utils";
import { CommonSurveyFields } from "src/store/types";

import { COLORS } from "../../styles/theme";
import Icon from "../Icon";

interface Props {
  id: number;
  isActive: boolean;
  unActiveMessage?: string;
  title: CommonSurveyFields["title"];
}

// TODO think about how split childs efficiently

const SurveyCard = ({
  // id,
  title,
  isActive,
  unActiveMessage = "Не активно",
}: Props): JSX.Element => {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: id,
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));
  const ComponentIcon = isActive ? AiOutlineLock : GiSightDisabled;
  const iconColor = COLORS[isActive ? "primary" : "gray"];

  return (
    <Flex
      // ref={drag}
      p="10px"
      border="1px"
      height="100%"
      borderRadius="5px"
      direction="column"
      textAlign="center"
      alignItems="center"
      borderColor={iconColor}
      borderStyle={isActive ? "solid" : "dashed"}
      cursor={isActive ? "pointer" : "not-allowed"}
    >
      <Icon as={ComponentIcon} size="large" color={iconColor} />
      <Text fontSize="xl" flexGrow={1}>
        {isActive ? firstLetterToUpperCase(title) : unActiveMessage}
      </Text>
    </Flex>
  );
};

export default SurveyCard;
