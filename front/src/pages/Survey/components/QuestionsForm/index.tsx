import React from "react";
import { useFormik } from "formik";

import { Question } from "../../../../store/surveyStore/types";

import { Button, Input, Textarea } from "../../../../components/ui";
import FormItemTitle from "../FormItemTitle";

import { FormProps } from "./types";
import { isOptionTypeShort } from "../../../../utils/api";

interface Props {
  data: Question[];
}

const QuestionsForm = ({ data }: Props): JSX.Element => {
  const { values, isSubmitting, handleChange, handleSubmit } =
    useFormik<FormProps>({
      initialValues: {},
      onSubmit: (data) => {
        console.log(data);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      {data.map(({ id, description, options }) => {
        const isArray = Array.isArray(options);

        if (isArray) {
          return <>radio</>;
        }

        return (
          <>
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
          </>
        );
      })}
      <Button label="Завершить" type="submit" isLoading={isSubmitting} />
    </form>
  );
};

export default QuestionsForm;
