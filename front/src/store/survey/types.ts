import { CommonSurveyFields, SurveyStatus } from '../types';

type EmptyLoading = '';

export interface SurveyResult {
  [key: number]: number;
}

export interface ChartData {
  [key: string]: number;
}

export type FormLoading = EmptyLoading | 'finish' | 'nextStatus';

export type Loading = EmptyLoading | 'chart' | 'survey';

export interface ButtonRender {
  label: string;
  to: SurveyStatus;
}

export interface Question {
  id: number;
  text: string;
}

export interface Survey extends CommonSurveyFields {
  description: string;
  questions: Question[];
}
