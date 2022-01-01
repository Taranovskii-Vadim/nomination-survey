import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { useFetchData } from "../../utils/hooks";
import {
  firstLetterToUpperCase,
  getLoadingMessage,
  isHaveAccess,
} from "../../utils";
import SurveyStore from "../../store/surveyStore";
import UserStore from "../../store/userStore";

import { Loader, Title } from "../../components/ui";
import { SurveyIcon } from "../../components/icons";
import AccessDenied from "../../components/AccessDenied";
import QuestionsForm from "./components/QuestionsForm";
import SurveyCompleted from "../../components/SurveyCompleted";
import BarChart from "../../components/BarChart";

const surveyStore = new SurveyStore();

interface Props {
  userStore: UserStore;
}

const Survey = ({ userStore }: Props): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  const { data } = surveyStore;

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading) {
    return <Loader text={getLoadingMessage("опроса")} />;
  }

  if (!isHaveAccess(userStore.data.role, data.status)) {
    return <AccessDenied />;
  }

  if (surveyStore.surveyCompleted) {
    return <SurveyCompleted />;
  }

  const Form = (
    <QuestionsForm
      data={data.questions}
      isSubmiting={surveyStore.formLoading}
      surveyStatus={surveyStore.data.status}
      userRole={userStore.data.role}
      sendSurveyResults={(data) => {
        surveyStore.sendUserAnswer(data);
      }}
      setNextStatus={(data) => {
        surveyStore.setNextSurveyStatus(data);
      }}
      downloadResults={() => {
        surveyStore.downloadSurveyResults();
      }}
    />
  );

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
        <SurveyIcon size="large" color="primary" />
        <Box ml="15" lineHeight="1" maxW="95%">
          <Title>{firstLetterToUpperCase(data.title)}</Title>
          <Text mt="2" lineHeight="21px">
            {data.description}
          </Text>
        </Box>
      </Flex>
      {userStore.data.role === "admin" || userStore.data.role === "chief" ? (
        <Tabs>
          <TabList>
            <Tab>Результаты пользователей</Tab>
            <Tab>Опрос</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <BarChart />
            </TabPanel>
            <TabPanel>{Form}</TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        Form
      )}
    </Container>
  );
};

export default observer(Survey);
