import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "@chakra-ui/react";

import { setUrlFor } from "../../routes";

import { TickIcon } from "../icons";
import { Button } from "../ui";
import FullPageContainer from "../FullPageContainer";

const SurveyCompleted = (): JSX.Element => (
  <FullPageContainer>
    <TickIcon size="large" color="primary" />
    <Text mt="4" mb="4">
      Спасибо за прохождение опроса
    </Text>
    <NavLink to={setUrlFor("surveys")}>
      <Button label="На главную" />
    </NavLink>
  </FullPageContainer>
);

export default SurveyCompleted;
