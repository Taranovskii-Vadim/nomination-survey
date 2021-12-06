import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useFetchData } from "../../utils/hooks";
import { firstLetterToUpperCase, isHaveAccess } from "../../utils";
import SurveyStore from "../../store/surveyStore";
import UserStore from "../../store/userStore";

import { Loader } from "../../components/ui";
import AccessDenied from "../../components/AccessDenied";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { SurveyIconOutline } from "../../components/icons";
import Title from "../../components/ui/Title";

const surveyStore = new SurveyStore();

interface Props {
  userStore: UserStore;
}

const Survey = ({ userStore }: Props): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading || !surveyStore.data) {
    return <Loader />;
  }

  if (!isHaveAccess(userStore.data.role, surveyStore.data.status)) {
    return <AccessDenied />;
  }

  return (
    <Container maxWidth="container.xl" pt="50">
      <Flex alignItems="center" mb="35">
        <SurveyIconOutline size="large" />
        <Box ml="15">
          <Title>{firstLetterToUpperCase(surveyStore.data.title)}</Title>
          <Text>test description text</Text>
        </Box>
      </Flex>
      <Box>block with questions</Box>
    </Container>
  );
};

export default observer(Survey);
