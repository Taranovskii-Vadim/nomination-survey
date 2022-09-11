import React from "react";
import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";

import {
  FormLoading,
  Question,
  SurveyResult,
} from "../../../../store/survey/types";

import Range from "../../../../components/ui/Range";
import FormItemTitle from "../FormItemTitle";
import FormFooter from "../FormFooter";
import { UserRole } from "src/store/user/types";
import { SurveyStatus } from "src/store/types";

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
