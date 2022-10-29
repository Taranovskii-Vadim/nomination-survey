import React from 'react';
import { Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai';

import { setUrlFor } from '../../routes';

import Button from '../ui/Button';
import FullPageContainer from '../FullPageContainer';
import Icon from '../Icon';

const AccessDenied = (): JSX.Element => (
  <FullPageContainer>
    <Icon as={AiOutlineLock} size="large" />
    <Text mt="4" mb="4">
      К сожалению на данный момент вы не можете принять участие в опросе
    </Text>
    <NavLink to={setUrlFor('surveys')}>
      <Button label="На главную" />
    </NavLink>
  </FullPageContainer>
);

export default AccessDenied;
