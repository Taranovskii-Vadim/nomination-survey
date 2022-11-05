import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { SimpleGrid, Container } from '@chakra-ui/react';

import { setUrlForSurvey } from 'src/routes';
import userStore from 'src/store/user';
import SurveysStore from 'src/store/surveys';
import { useFetchData } from 'src/utils/hooks';

import Loader from 'src/components/ui/Loader';
import SurveyCard from './components/SurveyCard';

import { isHaveAccess } from '../helpers';

const store = new SurveysStore();

const General = (): JSX.Element => {
  useFetchData(store.fetchSurveys);

  if (store.loading) {
    return <Loader text="опросов" />;
  }

  return (
    <Container as="main" maxWidth="container.md">
      <SimpleGrid columns={2} spacing={10} mt="10">
        {store.data.map(({ id, title, status }) => {
          const isActive = isHaveAccess(userStore.data.role, status);
          // TODO think how to exclude link from dom
          return (
            <NavLink key={id} to={setUrlForSurvey(id)}>
              <SurveyCard title={title} isActive={isActive} />
            </NavLink>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default observer(General);
