import { User } from "../../types";

export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface FileData {
  title: string;
  users: FileUser[];
}

export interface FileAnswer {
  id: number;
  text: string;
  answer: number;
}

export interface Survey {
  id: number;
  title: string;
  questions: number[];
  status: SurveyStatus;
}

export interface FileUser extends User {
  questions: FileAnswer[];
}

export type SurveyCommonData = Omit<Survey, "questions">;
