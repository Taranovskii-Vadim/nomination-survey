import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SimpleGrid, Container } from '@chakra-ui/react';

import SurveysStore from 'src/store/surveys';

import Loader from 'src/components/ui/Loader';

import List from './components/List';

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
        <List store={store} />
      </SimpleGrid>
    </Container>
  );
};

export default observer(Surveys);
