import { SurveyStatus } from "../../types";

export interface CommonSurveyFields {
  readonly id: string;
  status: SurveyStatus;
  title: string;
}

export type OptionType = "shortAnswer" | "longAnswer";

export interface Option {
  value: number;
  label: string;
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
  options: Option[] | OptionType;
}

export interface HashedQuestion {
  [key: string]: Question;
}

export interface Survey extends CommonSurveyFields {
  description?: string;
  questions: Question[];
}
