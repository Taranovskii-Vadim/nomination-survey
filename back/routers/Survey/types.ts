import { Request, RequestWithId, User } from "../../types";

export type SurveyStatus = "ready" | "userVote" | "chiefVote" | "finished";

export type GetResultsRequest = Request<{ id: string; role: string }>;

export type ChangeStatusRequest = RequestWithId<{ status: SurveyStatus }>;

export type SaveResultsRequest = RequestWithId<{ [key: number]: number }>;

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
