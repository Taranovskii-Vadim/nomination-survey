export type SurveyStatus = 'ready' | 'userVote' | 'chiefVote' | 'finished';

export interface CommonSurveyFields {
  id: number;
  title: string;
  status: SurveyStatus;
}
