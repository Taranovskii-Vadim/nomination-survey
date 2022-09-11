export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface CommonSurveyFields {
  readonly id: string;
  status: SurveyStatus;
  title: string;
}
