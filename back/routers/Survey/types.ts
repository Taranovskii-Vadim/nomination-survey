import { User } from "../../types";

export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface Survey {
  id: number;
  title: string;
  questions: number[];
  status: SurveyStatus;
}

export type SurveyCommonData = Omit<Survey, "questions">;

export interface FileAnswer {
  id: number;
  text: string;
  answer: number;
}

export interface FileUser extends User {
  questions: FileAnswer[];
}

export interface FileData {
  title: string;
  users: FileUser[];
}
