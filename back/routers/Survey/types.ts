import { Request, RequestWithId, User } from "../../types";

export type GetResultsRequest = Request<{ id: string; role: string }>;

export type ChangeStatusRequest = RequestWithId<{ status: SurveyStatus }>;

export type SaveResultsRequest = RequestWithId<{ [key: number]: number }>;

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

export interface SurveyDB {
  id: number;
  title: string;
  questions: number[];
  status: SurveyStatus;
}

export interface Question {
  id: number;
  text: string;
}

export interface FileUser extends User {
  questions: FileAnswer[];
}

export type SurveyCommonData = Omit<SurveyDB, "questions">;
