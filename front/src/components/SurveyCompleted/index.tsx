import React from 'react';
import { Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MdOutlineDone } from 'react-icons/md';

import { setUrlFor } from '../../routes';

import Button from '../ui/Button';
import FullPageContainer from '../FullPageContainer';
import Icon from '../Icon';

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
