import { action, makeObservable, observable, runInAction } from "mobx";

import { getErrorMessageWithId } from "../../constants";

import { api } from "../../api";
import getQuestionById from "../../api/getQuestionById";
import getSurveyById, { GetSurveyByIdDTO } from "../../api/getSurveyById";
import getSurveyChartResults from "../../api/getSurveyChartResults";
import postSurveyResults from "../../api/postSurveyResults";
import putNextSurveyStatus from "../../api/putNextSurveyStatus";

import {
  ChartData,
  FormLoading,
  HashedQuestion,
  Loading,
  Question,
  Survey,
  SurveyResult,
} from "./types";
import { SurveyStatus } from "../types";
import { UserRole } from "../user/types";

class SurveyStore {
  loading: Loading = "survey";

  surveyCompleted = false;

  formLoading: FormLoading = "";

  data: Survey | undefined = undefined;

  chartData: ChartData = {};

  hashedQuestions: HashedQuestion = {};

  constructor() {
    makeObservable(this, {
      loading: observable,
      formLoading: observable,

      setLoading: action,
      setFormLoading: action,
    });
  }

  setFormLoading = (value: FormLoading): void => {
    this.formLoading = value;
  };

  setLoading = (value: Loading): void => {
    if (this.loading !== value) {
      this.loading = value;
    }
  };

  fetchSurveyQuestionById = async (id: string): Promise<Question> => {
    try {
      let result: Question = this.hashedQuestions[id];
      if (!result) {
        result = await api(getQuestionById, undefined, id);
        this.hashedQuestions[id] = result;
      }

      return result;
    } catch (e) {
      console.error(getErrorMessageWithId("question", id));
    }
  };

  fetchSurveyById = async (id: string): Promise<void | null> => {
    try {
      this.setLoading("survey");
      const { isUserVoted, data }: GetSurveyByIdDTO = await api(
        getSurveyById,
        undefined,
        id
      );

      const questions = await Promise.all(
        data.questions.map((item) => this.fetchSurveyQuestionById(item))
      );

      runInAction(() => {
        this.data = { ...data, questions };
        this.surveyCompleted = isUserVoted;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading("");
    }
  };

  sendUserAnswer = async (data: SurveyResult) => {
    try {
      this.setFormLoading("finish");
      await api(postSurveyResults, data, this.data.id);

      runInAction(() => {
        this.surveyCompleted = true;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setFormLoading("");
    }
  };

  setNextSurveyStatus = async (status: SurveyStatus) => {
    try {
      this.setFormLoading("nextStatus");

      await api(putNextSurveyStatus, { status }, this.data.id);
      runInAction(() => {
        this.data.status = status;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setFormLoading("");
    }
  };

  fetchChartResults = async (role: UserRole): Promise<void> => {
    try {
      this.setLoading("chart");

      const chartResult = await api(
        getSurveyChartResults,
        undefined,
        `${role}/${this.data.id}`
      );

      runInAction(() => {
        this.chartData = chartResult;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading("");
    }
  };
}

export default SurveyStore;
