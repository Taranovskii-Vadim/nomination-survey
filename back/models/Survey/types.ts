export interface SurveyDataBase {
  id: string;
  title: string;
  status: SurveyStatus;
  questions: string[];
}

export type SurveysRender = Pick<SurveyDataBase, "id" | "title" | "status">;

export type SurveyStatus =
  | "notStarted"
  | "userVoting"
  | "chiefVoting"
  | "finished";
