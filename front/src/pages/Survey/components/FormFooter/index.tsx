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
  setNextStatus: (nextStatus: SurveyStatus) => void;
  downloadResults: () => void;
}

const FormFooter = ({
  isAdmin,
  isSubmiting,
  surveyStatus,
  setNextStatus,
  downloadResults,
}: Props): JSX.Element => {
  const button = getButtons(surveyStatus);

  return (
    <Flex mt={10} alignItems="center" justifyContent="end">
      {isAdmin ? (
        <>
          <Button
            label="Скачать результаты"
            disabled={surveyStatus !== "finished"}
            isLoading={isSubmiting === "download"}
            mr={5}
            onClick={downloadResults}
          />
          {button ? (
            <Button
              label={button.label}
              isLoading={isSubmiting === "nextStatus"}
              onClick={() => setNextStatus(button.to)}
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