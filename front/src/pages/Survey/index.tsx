import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import SurveyStore from 'src/store/survey';

import Content from './components/Content';

const store = new SurveyStore();

const Survey = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    store.fetchSurveyById(+id);
  }, []);

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
      <Content store={store} />
    </Container>
  );
};

export default Survey;
