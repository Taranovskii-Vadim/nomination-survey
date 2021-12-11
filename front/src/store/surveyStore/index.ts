import { action, makeObservable, observable, runInAction } from "mobx";
import { getErrorMessageWithId } from "../../constants";

import { api } from "../../routes/api";
import getQuestionById from "../../routes/api/getQuestionById";
import getSurveyById, {
  GetSurveyByIdDTO,
} from "../../routes/api/getSurveyById";

import { HashedQuestion, Question, Survey } from "./types";

class SurveyStore {
  loading = false;

  data: Survey | undefined = undefined;

  hashedQuestions: HashedQuestion = {};

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

  fetchSurveyById = async (id: string): Promise<void | null> => {
    // TODO we can hash our results
    // if (this.data && this.data.id === id) return null;

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
