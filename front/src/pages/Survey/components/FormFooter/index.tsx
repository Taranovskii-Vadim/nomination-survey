import React from 'react';
import { Flex } from '@chakra-ui/react';

import { SurveyStatus } from 'src/store/types';
import { FormLoading } from 'src/store/survey/types';

import Button from 'src/components/ui/Button';

import { BUTTONS } from './constants';

interface Props {
  isAdmin: boolean;
  isSubmiting: FormLoading;
  surveyStatus: SurveyStatus;
  setNextStatus: (nextStatus: SurveyStatus) => void;
}

const FormFooter = ({ isAdmin, isSubmiting, surveyStatus, setNextStatus }: Props): JSX.Element => {
  const button = BUTTONS[surveyStatus];

  return (
    <Flex mt={10} alignItems="center" justifyContent="end">
      {isAdmin ? (
        <Button
          label={button.label}
          isLoading={isSubmiting === 'nextStatus'}
          onClick={() => setNextStatus(button.to)}
        />
      ) : (
        <Button label="Завершить" type="submit" isLoading={isSubmiting === 'finish'} />
      )}
    </Flex>
  );
};

export default FormFooter;
