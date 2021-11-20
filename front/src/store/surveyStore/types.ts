import { SurveyFrontStatus } from "../types";

export interface Survey {
  readonly id: string;
  status: SurveyFrontStatus;
  title: string;
}
