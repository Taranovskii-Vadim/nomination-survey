import { CommonSurveyFields } from "../surveyStore/types";

export type SurveyRenderItem = Pick<
  CommonSurveyFields,
  "id" | "status" | "title"
>;
