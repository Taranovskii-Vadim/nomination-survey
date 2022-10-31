import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { AiOutlineLock } from 'react-icons/ai';
import { GiSightDisabled } from 'react-icons/gi';

import { COLORS } from 'src/styles/theme';
import { firstLetterToUpperCase } from 'src/utils';
import { CommonSurveyFields } from 'src/store/types';

import Icon from 'src/components/Icon';

interface Props {
  isActive: boolean;
  title: CommonSurveyFields['title'];
}

// TODO check and think about how split childs efficiently

const SurveyCard = ({ title, isActive }: Props): JSX.Element => {
  const iconColor = COLORS[isActive ? 'primary' : 'gray'];
  const ComponentIcon = isActive ? AiOutlineLock : GiSightDisabled;

  const text = isActive ? firstLetterToUpperCase(title) : 'Голосование временно недоступно';

  return (
    <Flex
      p="10px"
      border="1px"
      height="100%"
      borderRadius="5px"
      direction="column"
      textAlign="center"
      alignItems="center"
      borderColor={iconColor}
      borderStyle={isActive ? 'solid' : 'dashed'}
      cursor={isActive ? 'pointer' : 'not-allowed'}
    >
      <Icon as={ComponentIcon} size="large" color={iconColor} />
      <Text fontSize="xl" flexGrow={1}>
        {text}
      </Text>
    </Flex>
  );
};

export default SurveyCard;
