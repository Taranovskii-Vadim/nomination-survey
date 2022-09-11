export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface CommonSurveyFields {
  id: number;
  status: SurveyStatus;
  title: string;
}
