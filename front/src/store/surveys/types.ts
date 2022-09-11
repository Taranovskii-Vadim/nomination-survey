import { CommonSurveyFields } from "../types";

export type SurveyRenderItem = Pick<
  CommonSurveyFields,
  "id" | "status" | "title"
>;
