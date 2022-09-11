import { SurveyStatus } from "src/store/types";
import { ButtonRender } from "../../../../store/survey/types";

const BUTTONS: { [key: string]: ButtonRender } = {
  finished: { label: "Начать заново", to: "ready" },
  chiefVote: { label: "Завершить голосование", to: "finished" },
  ready: { label: "Начать голосование пользователей", to: "userVote" },
  userVote: { label: "Начать голосование руководителей", to: "chiefVote" },
};

export const getButtons = (status: SurveyStatus): ButtonRender => {
  const button = BUTTONS[status];
  return button;
};
