import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

import { Question } from "../../../../store/surveyStore/types";
import { firstLetterToUpperCase } from "../../../../utils";
import { isOptionTypeShort } from "../../../../utils/api";

interface Props {
  data: Question[];
}

const QuestionsForm = ({ data }: Props): JSX.Element => {
  const onFormSubmit = (data: any): void => {
    console.log(data);
  };

  return (
    <Formik initialValues={{}} onSubmit={onFormSubmit}>
      {(props) => (
        <Form>
          {data.map(({ id, description, options }) => {
            return (
              <Field key={id} name={id}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor={id}>
                      {firstLetterToUpperCase(description)}
                    </FormLabel>
                    {/* TODO improve this code */}
                    {Array.isArray(options) ? (
                      <Input {...field} id={id} />
                    ) : isOptionTypeShort(options) ? (
                      <Input {...field} id={id} />
                    ) : (
                      <Textarea {...field} id={id} />
                    )}
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            );
          })}
          <Button mt={4} isLoading={props.isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionsForm;
