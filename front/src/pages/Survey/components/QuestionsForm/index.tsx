import React from "react";
import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";

import {
  FormLoading,
  Question,
  SurveyResult,
} from "../../../../store/surveyStore/types";
import { SurveyStatus, UserRole } from "../../../../types";

import Range from "../../../../components/ui/Range";
import FormItemTitle from "../FormItemTitle";
import FormFooter from "../FormFooter";

interface Props {
  data: Question[];
  userRole: UserRole;
  isSubmiting: FormLoading;
  surveyStatus: SurveyStatus;
  sendSurveyResults: (data: SurveyResult) => void;
  setNextStatus: (nextStatus: SurveyStatus) => void;
  downloadResults: () => void;
}

const QuestionsForm = ({
  data,
  isSubmiting,
  userRole,
  surveyStatus,
  sendSurveyResults,
  setNextStatus,
  downloadResults,
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
      {data.map(({ id, description }) => (
        <Box key={id} mb={5} _last={{ mb: 0 }}>
          <FormItemTitle name={id} label={description} />
          <Range
            isDisabled={isFormFieldsDisabled}
            onChange={(val) => setFieldValue(id, val)}
          />
        </Box>
      ))}
      <FormFooter
        isSubmiting={isSubmiting}
        isAdmin={isAdmin}
        surveyStatus={surveyStatus}
        setNextStatus={setNextStatus}
        downloadResults={downloadResults}
      />
    </form>
  );
};

export default QuestionsForm;
