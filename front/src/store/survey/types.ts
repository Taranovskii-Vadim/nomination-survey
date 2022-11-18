import { CommonSurveyFields } from '../types';

export type FormLoading = '' | 'finish' | 'nextStatus';

export interface ChartData {
  [key: string]: number;
}

export interface UserAnswer {
  [key: number]: number;
}

export interface Question {
  id: number;
  text: string;
}

export interface Survey extends CommonSurveyFields {
  description: string;
  questions: Question[];
}

export interface SurveyResponse {
  survey: Survey;
  isUserVoted: boolean;
}
