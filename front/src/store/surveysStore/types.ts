import { Survey } from "../surveyStore/types";

export type SurveyRenderItem = Pick<Survey, "id" | "status" | "title">;
