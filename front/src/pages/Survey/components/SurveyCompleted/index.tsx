import React from 'react';
import { Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MdOutlineDone } from 'react-icons/md';

import { setUrlFor } from 'src/routes';

import Icon from 'src/components/Icon';
import Button from 'src/components/ui/Button';
import FullPageContainer from 'src/components/FullPageContainer';

const SurveyCompleted = (): JSX.Element => (
  <FullPageContainer>
    <Icon as={MdOutlineDone} size="large" />
    <Text mt="4" mb="4">
      Спасибо за прохождение опроса
    </Text>
    <NavLink to={setUrlFor('surveys')}>
      <Button label="На главную" />
    </NavLink>
  </FullPageContainer>
);

export default SurveyCompleted;
