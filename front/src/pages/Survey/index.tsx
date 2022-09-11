import React from "react";
import { GoBook } from "react-icons/go";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { useFetchData } from "../../utils/hooks";
import { firstLetterToUpperCase, getLoadingMessage } from "../../utils";
import SurveyStore from "../../store/survey";
import UserStore from "../../store/user";
import { COLORS } from "../../styles/theme";

import { Loader, Title } from "../../components/ui";
import AccessDenied from "../../components/AccessDenied";
import QuestionsForm from "./components/QuestionsForm";
import SurveyCompleted from "../../components/SurveyCompleted";
import BarChart from "../../components/BarChart";
import Icon from "src/components/Icon";
import { isHaveAccess } from "../helpers";

const surveyStore = new SurveyStore();

interface Props {
  userStore: UserStore;
}

const Survey = ({ userStore }: Props): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  const { data } = surveyStore;

  const isHaveAccessToTabs =
    userStore.data.role === "admin" || userStore.data.role === "chief";

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading === "survey") {
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
        <Icon size="large" as={GoBook} color={COLORS["primary"]} />
        <Box ml="15" lineHeight="1" maxW="95%">
          <Title>{firstLetterToUpperCase(data.title)}</Title>
          <Text mt="2" lineHeight="21px">
            {data.description}
          </Text>
        </Box>
      </Flex>
      {isHaveAccessToTabs ? (
        <Tabs
          onChange={(index) => {
            if (index === 1) {
              surveyStore.fetchChartResults("user");
            } else if (index === 2) {
              surveyStore.fetchChartResults("chief");
            }
          }}
        >
          <TabList>
            <Tab>Опрос</Tab>
            <Tab>Результаты пользователей</Tab>
            <Tab>Результаты руководителей</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{Form}</TabPanel>
            <TabPanel>
              {surveyStore.loading === "chart" ? (
                <Loader
                  containerHeight="50vh"
                  text={getLoadingMessage("данных")}
                />
              ) : (
                <BarChart chart={surveyStore.chartData} />
              )}
            </TabPanel>
            <TabPanel>
              {surveyStore.loading === "chart" ? (
                <Loader
                  containerHeight="50vh"
                  text={getLoadingMessage("данных")}
                />
              ) : (
                <BarChart chart={surveyStore.chartData} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        Form
      )}
    </Container>
  );
};

export default observer(Survey);
