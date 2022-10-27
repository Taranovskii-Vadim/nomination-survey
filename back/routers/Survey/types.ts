import { Request, RequestWithId, User } from "../../types";

export type GetResultsRequest = Request<{ id: string; role: string }>;

export type ChangeStatusRequest = RequestWithId<{ status: SurveyStatus }>;

export type SaveResultsRequest = RequestWithId<{ [key: number]: number }>;

export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export interface FileData {
  title: string;
  users: FileUser[];
}

export interface Question {
  id: number;
  text: string;
}

export interface FileAnswer extends Question {
  answer: number;
}

export interface Survey<T = number> {
  id: number;
  title: string;
  questions: T[];
  status: SurveyStatus;
}

export interface FileUser extends User {
  questions: FileAnswer[];
}
