import React from "react";
import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";

import { SurveyStatus } from "src/store/types";
import { UserRole } from "src/store/user/types";
import { FormLoading, Question, SurveyResult } from "src/store/survey/types";

import FormFooter from "../FormFooter";
import Range from "src/components/ui/Range";
import FormItemTitle from "../FormItemTitle";

interface Props {
  data: Question[];
  userRole: UserRole;
  isSubmiting: FormLoading;
  surveyStatus: SurveyStatus;
  sendSurveyResults: (data: SurveyResult) => void;
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
  const { setFieldValue, handleSubmit } = useFormik<SurveyResult>({
    initialValues: {},
    onSubmit: (data) => {
      sendSurveyResults(data);
    },
  });

  const isAdmin = userRole === "admin";

  const isFormFieldsDisabled = isAdmin || isSubmiting === "finish";

  return (
    <form onSubmit={handleSubmit}>
      {data.map(({ id, text }) => (
        <Box key={id} mb={5} _last={{ mb: 0 }}>
          <FormItemTitle id={id} label={text} />
          <Range
            isDisabled={isFormFieldsDisabled}
            onChange={(val) => setFieldValue(id.toString(), val)}
          />
        </Box>
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
