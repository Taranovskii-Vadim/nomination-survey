import { SurveyStatus } from "../../types";

export interface CommonSurveyFields {
  readonly id: string;
  status: SurveyStatus;
  title: string;
}

export interface SurveyResult {
  [key: string]: string | number;
}

export type FormLoading = "" | "finish" | "download" | "nextStatus";

export interface ButtonRender {
  label: string;
  to: SurveyStatus;
}

export interface Question {
  readonly id: string;
  description: string;
}

export interface HashedQuestion {
  [key: string]: Question;
}

export interface Survey extends CommonSurveyFields {
  description?: string;
  questions: Question[];
}
