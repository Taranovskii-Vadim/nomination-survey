export type SurveyStatus = 'ready' | 'userVote' | 'chiefVote' | 'finished';
// TODO refactor and rewrite front types
export interface CommonSurveyFields {
  id: number;
  title: string;
  status: SurveyStatus;
}
