import { ButtonRender } from "../../../../store/surveyStore/types";
import { SurveyStatus } from "../../../../types";

const BUTTONS: { [key: string]: ButtonRender } = {
  notStarted: { label: "Начать голосование пользователей", to: "userVote" },
  userVote: { label: "Начать голосование руководителей", to: "chiefVote" },
  chiefVote: { label: "Завершить голосование", to: "finished" },
  finished: { label: "Начать заново", to: "notStarted" },
};

export const getButtons = (status: SurveyStatus): ButtonRender => {
  const button = BUTTONS[status];
  return button;
};
