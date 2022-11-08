import React from 'react';
import { observer } from 'mobx-react-lite';
import { GoBook } from 'react-icons/go';
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

// TODO check components split one more time
import SurveyStore from 'src/store/survey';
import user from 'src/store/user';
import { COLORS } from 'src/styles/theme';

import { firstLetterToUpperCase } from 'src/utils';

import Icon from 'src/components/Icon';
import Loader from 'src/components/ui/Loader';

import { isHaveAccess } from 'src/pages/helpers';

import BarChart from '../BarChart';
import AccessDenied from '../AccessDenied';
import QuestionsForm from '../QuestionsForm';
import SurveyCompleted from '../SurveyCompleted';

interface Props {
  store: SurveyStore;
}

const Content = ({ store }: Props): JSX.Element => {
  // TODO is it correct observe isLoading and not data???
  if (store.isSurveyLoading || !store.data) {
    return <Loader text="опроса" />;
  }

  if (!isHaveAccess(user.data.role, store.data.status)) {
    return <AccessDenied />;
  }

  if (store.surveyCompleted) {
    return <SurveyCompleted />;
  }

  const isHaveAccessToTabs = user.data.role !== 'user';

  const Form = (
    <QuestionsForm
      data={store.data.questions}
      userRole={user.data.role}
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
    <>
      <Flex alignItems="start" mb="35">
        <Icon size="large" as={GoBook} color={COLORS.primary} />
        <Box ml="15" lineHeight="1" maxW="95%">
          <Text fontSize="3xl">{firstLetterToUpperCase(store.data.title)}</Text>
          <Text mt="2" lineHeight="21px">
            {store.data.description}
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
    </>
  );
};

export default observer(Content);
