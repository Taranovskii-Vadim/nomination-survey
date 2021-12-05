import { action, makeObservable, observable, runInAction } from "mobx";
import { getErrorMessageWithId } from "../../constants";

import { api } from "../../routes/api";
import getQuestionById from "../../routes/api/getQuestionById";
import getSurveyById, {
  GetSurveyByIdDTO,
} from "../../routes/api/getSurveyById";

import { Question, Survey } from "./types";

class SurveyStore {
  loading = false;

  data: Survey | undefined = undefined;

  constructor() {
    makeObservable(this, {
      loading: observable,

      setLoading: action,
    });
  }

  setLoading = (value: boolean): void => {
    this.loading = value;
  };

  fetchSurveyQuestionById = async (id: string): Promise<Question> => {
    try {
      const result: Question = await api(getQuestionById, undefined, { id });
      return result;
    } catch (e) {
      console.error(getErrorMessageWithId("question", id));
    }
  };

  fetchSurveyById = async (id: string): Promise<void> => {
    try {
      this.setLoading(true);
      const survey: GetSurveyByIdDTO = await api(getSurveyById, undefined, {
        id,
      });

      const questions = await Promise.all(
        survey.questions.map((item) => this.fetchSurveyQuestionById(item))
      );

      runInAction(() => {
        this.data = { ...survey, questions };
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };
}

export default SurveyStore;
