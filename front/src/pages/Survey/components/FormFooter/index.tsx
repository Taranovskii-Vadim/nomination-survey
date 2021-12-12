import React from "react";
import { Flex } from "@chakra-ui/react";

import { SurveyStatus } from "../../../../types";
import { FormLoading } from "../../../../store/surveyStore/types";

import { Button } from "../../../../components/ui";
import { getButtons } from "./constants";

interface Props {
  isSubmiting: FormLoading;
  isAdmin: boolean;
  surveyStatus: SurveyStatus;
}

const FormFooter = ({
  isAdmin,
  isSubmiting,
  surveyStatus,
}: Props): JSX.Element => {
  const button = getButtons(surveyStatus);

  return (
    <Flex mt={10} alignItems="center" justifyContent="end">
      {isAdmin ? (
        <>
          <Button
            label="Скачать результаты"
            isLoading={isSubmiting === "download"}
            mr={5}
          />
          {button ? (
            <Button
              label={button.label}
              isLoading={isSubmiting === "nextStatus"}
            />
          ) : null}
        </>
      ) : (
        <Button
          label="Завершить"
          type="submit"
          isLoading={isSubmiting === "finish"}
        />
      )}
    </Flex>
  );
};

export default FormFooter;
