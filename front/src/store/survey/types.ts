import { CommonSurveyFields } from '../types';

type EmptyLoading = '';

export type Loading = EmptyLoading | 'chart' | 'survey';

export type FormLoading = EmptyLoading | 'finish' | 'nextStatus';

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
  data: Survey;
  isUserVoted: boolean;
}
