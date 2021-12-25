export interface SurveyDataBase {
  id: string;
  title: string;
  status: SurveyStatus;
  questions: string[];
}

export interface FileAnswer {
  description: string;
  answer: string;
}

export interface FileUser {
  id: string;
  login: string;
  answers: FileAnswer[];
}

export type SurveysRender = Pick<SurveyDataBase, "id" | "title" | "status">;

export interface FileData {
  title: string;
  users: FileUser[];
}

export type SurveyStatus =
  | "notStarted"
  | "userVoting"
  | "chiefVoting"
  | "finished";
