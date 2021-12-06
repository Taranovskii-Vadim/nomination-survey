import { SurveyStatus } from "../../types";

export interface CommonSurveyFields {
  readonly id: string;
  status: SurveyStatus;
  title: string;
}

export type OptionType = "shortAnswer" | "longAnswer";

export interface Option {
  readonly id: string;
  title: string;
}

export interface Question {
  readonly id: string;
  description: string;
  options: Option[] | OptionType;
}

export interface Survey extends CommonSurveyFields {
  description?: string;
  questions: Question[];
}
