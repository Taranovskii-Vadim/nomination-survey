import React from 'react';
import { Box } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { SurveyStatus } from 'src/store/types';
import { UserRole } from 'src/store/user/types';
import { FormLoading, Question, UserAnswer } from 'src/store/survey/types';

import FormFooter from '../FormFooter';
import Range from 'src/components/ui/Range';
import FormItemTitle from '../FormItemTitle';

interface Props {
  data: Question[];
  userRole: UserRole;
  isSubmiting: FormLoading;
  surveyStatus: SurveyStatus;
  sendSurveyResults: (data: UserAnswer) => void;
  setNextStatus: (nextStatus: SurveyStatus) => void;
}

const QuestionsForm = ({
  data,
  isSubmiting,
  userRole,
  surveyStatus,
  sendSurveyResults,
  setNextStatus,
}: Props): JSX.Element => {
  const { control, handleSubmit } = useForm<Record<string, number>>({
    defaultValues: data.reduce((acc, { id }) => {
      acc[id.toString()] = 5;

      return acc;
    }, {}),
  });

  const isAdmin = userRole === 'admin';
  const isFieldDisabled = isAdmin || isSubmiting === 'finish';

  const onSubmit: SubmitHandler<UserAnswer> = (answers) => {
    sendSurveyResults(answers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map(({ id, text }) => (
        <Controller
          key={id}
          name={id.toString()}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Box mb={5} _last={{ mb: 0 }}>
              <FormItemTitle id={id} label={text} />
              <Range value={value} onChange={onChange} isDisabled={isFieldDisabled} />
            </Box>
          )}
        />
      ))}
      <FormFooter
        isSubmiting={isSubmiting}
        isAdmin={isAdmin}
        surveyStatus={surveyStatus}
        setNextStatus={setNextStatus}
      />
    </form>
  );
};

export default QuestionsForm;
