import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SimpleGrid, Container } from '@chakra-ui/react';

import user from 'src/store/user';
import SurveysStore from 'src/store/surveys';
import { setUrlForSurvey } from 'src/routes';

import Loader from 'src/components/ui/Loader';

import Card from './components/Card';

import { isHaveAccess } from '../helpers';

const store = new SurveysStore();

const Surveys = (): JSX.Element => {
  useEffect(() => {
    store.fetchSurveys();
  }, []);

  if (store.loading) {
    return <Loader text="опросов" />;
  }

  return (
    <Container as="main" maxWidth="container.md">
      <SimpleGrid columns={2} spacing={10} mt="10">
        {store.data.map(({ id, title, status }) => {
          const isActive = isHaveAccess(user.data.role, status);

          if (isActive) {
            return (
              <NavLink key={id} to={setUrlForSurvey(id)}>
                <Card title={title} isActive={isActive} />
              </NavLink>
            );
          }

          return <Card key={id} title={title} isActive={isActive} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default observer(Surveys);
