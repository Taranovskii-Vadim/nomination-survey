import { SurveyDataBase, SurveysRender } from "./types";

export const getSurveysRender = (survey: SurveyDataBase): SurveysRender => {
  const { id, title, status } = survey;
  return { id, title, status };
};
