import { action, makeObservable, observable, runInAction } from "mobx";

import { getErrorMessageWithId } from "../../constants";

import { api } from "../../routes/api";
import getQuestionById from "../../routes/api/getQuestionById";
import getSurveyById, {
  GetSurveyByIdDTO,
} from "../../routes/api/getSurveyById";
import getSurveyChartResults from "../../routes/api/getSurveyChartResults";
import getSurveyResults from "../../routes/api/getSurveyResults";
import postSurveyResults from "../../routes/api/postSurveyResults";
import putNextSurveyStatus from "../../routes/api/putNextSurveyStatus";

import { SurveyStatus, UserRole } from "../../types";
import { mapSurveyStatusForBack } from "../../utils/api";

import {
  ChartData,
  FormLoading,
  HashedQuestion,
  Loading,
  Question,
  Survey,
  SurveyResult,
} from "./types";
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
        result = await api(getQuestionById, undefined, { id });
        this.hashedQuestions[id] = result;
      }

      return result;
    } catch (e) {
      console.error(getErrorMessageWithId("question", id));
    }
  };

  fetchSurveyById = async (surveyId: string): Promise<void | null> => {
    try {
      this.setLoading("survey");
      const { isUserVoted, data }: GetSurveyByIdDTO = await api(
        getSurveyById,
        undefined,
        {
          surveyId,
        }
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
      const surveyId = this.data.id;
      await api(postSurveyResults, data, { surveyId });
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
      const surveyId = this.data.id;
      const nextStatus = mapSurveyStatusForBack(status);
      await api(putNextSurveyStatus, { nextStatus }, { surveyId });
      runInAction(() => {
        this.data.status = status;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setFormLoading("");
    }
  };

  downloadSurveyResults = async () => {
    try {
      this.setFormLoading("download");
      const surveyId = this.data.id;
      await api(getSurveyResults, undefined, { surveyId });
    } catch (e) {
      console.log(e);
    } finally {
      this.setFormLoading("");
    }
  };

  fetchChartResults = async (role: UserRole): Promise<void> => {
    try {
      this.setLoading("chart");
      const surveyId = this.data.id;
      const chartResult = await api(getSurveyChartResults, undefined, {
        surveyId,
        role,
      });
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
