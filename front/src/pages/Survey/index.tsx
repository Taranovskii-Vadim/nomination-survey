import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";

import { useFetchData } from "../../utils/hooks";
import { COLORS } from "../../styles/constants";
import { firstLetterToUpperCase, isHaveAccess } from "../../utils";
import SurveyStore from "../../store/surveyStore";
import UserStore from "../../store/userStore";

import { Loader, Title } from "../../components/ui";
import { SurveyIconOutline } from "../../components/icons";
import AccessDenied from "../../components/AccessDenied";
import QuestionsForm from "./components/QuestionsForm";

const surveyStore = new SurveyStore();

interface Props {
  userStore: UserStore;
}

const Survey = ({ userStore }: Props): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  const { data } = surveyStore;

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading || !data) {
    return <Loader />;
  }

  if (!isHaveAccess(userStore.data.role, data.status)) {
    return <AccessDenied />;
  }

  return (
    <Container
      maxWidth={{
        xl: "container.xl",
        lg: "container.lg",
        sm: "container.sm",
      }}
      pt="50"
      pb="50"
    >
      <Flex alignItems="start" mb="35">
        <SurveyIconOutline size="large" color={COLORS.primary} />
        <Box ml="15" lineHeight="1" maxW="95%">
          <Title label={firstLetterToUpperCase(data.title)} />
          <Text mt="2" lineHeight="21px">
            {data.description}
          </Text>
        </Box>
      </Flex>
      <QuestionsForm
        data={data.questions}
        isSubmiting={surveyStore.formLoading}
        surveyStatus={surveyStore.data.status}
        userRole={userStore.data.role}
        sendSurveyResults={(data) => {
          surveyStore.sendUserAnswer(data);
        }}
      />
    </Container>
  );
};

export default observer(Survey);
