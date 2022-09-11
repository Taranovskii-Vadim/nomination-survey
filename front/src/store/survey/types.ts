import { CommonSurveyFields, SurveyStatus } from "../types";

type EmptyLoading = "";

export interface SurveyResult {
  [key: string]: string | number;
}

export interface ChartData {
  [key: string]: number;
}

export type FormLoading = EmptyLoading | "finish" | "nextStatus";

export type Loading = EmptyLoading | "chart" | "survey";

export interface ButtonRender {
  label: string;
  to: SurveyStatus;
}

export interface Question {
  id: number;
  text: string;
}

export interface HashedQuestion {
  [key: string]: Question;
}

export interface Survey extends CommonSurveyFields {
  description: string;
  questions: Question[];
}
