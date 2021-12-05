type SurveyStatus = "notStarted" | "userVoting" | "chiefVoting" | "finished";

export interface Survey {
  readonly id: string;
  title: string;
  status: SurveyStatus;
  leadersId: number[];
}
