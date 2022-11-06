import React, { useEffect } from 'react';
import { GoBook } from 'react-icons/go';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import userStore from 'src/store/user';
import { COLORS } from 'src/styles/theme';
import SurveyStore from 'src/store/survey';
import { firstLetterToUpperCase } from 'src/utils';

import Icon from 'src/components/Icon';
import Loader from 'src/components/ui/Loader';

import { isHaveAccess } from '../helpers';

import BarChart from './components/BarChart';
import AccessDenied from './components/AccessDenied';
import QuestionsForm from './components/QuestionsForm';
import SurveyCompleted from './components/SurveyCompleted';

const store = new SurveyStore();

const Survey = (): JSX.Element => {
  const { id } = useParams() as { id: string };

  const { data } = store;

  useEffect(() => {
    store.fetchSurveyById(+id);
  }, []);

  if (store.isSurveyLoading || !store.data) {
    return <Loader text="опроса" />;
  }

  if (!isHaveAccess(userStore.data.role, data.status)) {
    return <AccessDenied />;
  }

  if (store.surveyCompleted) {
    return <SurveyCompleted />;
  }

  const isHaveAccessToTabs = userStore.data.role !== 'user';

  const Form = (
    <QuestionsForm
      data={store.data.questions}
      userRole={userStore.data.role}
      isSubmiting={store.formLoading}
      surveyStatus={store.data.status}
      sendSurveyResults={(answers) => {
        store.sendUserAnswer(answers);
      }}
      setNextStatus={(status) => {
        store.setNextSurveyStatus(status);
      }}
    />
  );

  return (
    <Container
      pt="50"
      pb="50"
      maxWidth={{
        xl: 'container.xl',
        lg: 'container.lg',
        sm: 'container.sm',
      }}
    >
      <Flex alignItems="start" mb="35">
        <Icon size="large" as={GoBook} color={COLORS.primary} />
        <Box ml="15" lineHeight="1" maxW="95%">
          <Text fontSize="3xl">{firstLetterToUpperCase(data.title)}</Text>
          <Text mt="2" lineHeight="21px">
            {data.description}
          </Text>
        </Box>
      </Flex>
      {isHaveAccessToTabs ? (
        <Tabs
          onChange={(index) => {
            if (index === 1) {
              store.fetchChartResults('user');
            } else if (index === 2) {
              store.fetchChartResults('chief');
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
              <BarChart store={store} />
            </TabPanel>
            <TabPanel>
              <BarChart store={store} />
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
