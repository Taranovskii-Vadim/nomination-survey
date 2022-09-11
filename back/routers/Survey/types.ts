import { User } from "../../types";

export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface Survey {
  id: number;
  title: string;
  status: SurveyStatus;
  questions: number[];
}

export type SurveyCommonData = Omit<Survey, "questions">;

// export interface FileAnswer {
//   id: string;
//   description: string;
//   answer: string;
// }

// export interface FileUser extends User {
//   questions: FileAnswer[];
// }

// export interface FileData {
//   title: string;
//   users: FileUser[];
// }
