import React from "react";
import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";

import { Question, SurveyResult } from "../../../../store/surveyStore/types";

import { Button, Dropdown, Input, Textarea } from "../../../../components/ui";
import FormItemTitle from "../FormItemTitle";

import { isOptionTypeShort } from "../../../../utils/api";

interface Props {
  data: Question[];
  isSubmiting: boolean;
  sendSurveyResults: (data: SurveyResult) => void;
}

const QuestionsForm = ({
  data,
  isSubmiting,
  sendSurveyResults,
}: Props): JSX.Element => {
  const { values, handleChange, handleSubmit } = useFormik<SurveyResult>({
    initialValues: {},
    onSubmit: (data) => {
      console.log(data);
      sendSurveyResults(data);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {data.map(({ id, description, options }) => {
        const isArray = Array.isArray(options);
        // TODO think about this code
        if (isArray) {
          return (
            <Box mb={2}>
              <FormItemTitle name={id} label={description} />
              <Dropdown
                name={id}
                options={options}
                value={values[id]}
                onChange={handleChange}
              />
            </Box>
          );
        }

        return (
          <Box mb={2}>
            <FormItemTitle name={id} label={description} />
            {isOptionTypeShort(options) ? (
              <Input
                type="text"
                id={id}
                name={id}
                value={values[id]}
                onChange={handleChange}
              />
            ) : (
              <Textarea
                id={id}
                name={id}
                value={values[id]}
                onChange={handleChange}
              />
            )}
          </Box>
        );
      })}
      <Button
        label="Завершить"
        type="submit"
        isLoading={isSubmiting}
        mr="auto"
      />
    </form>
  );
};

export default QuestionsForm;
