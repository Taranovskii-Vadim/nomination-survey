import { action, makeObservable, observable, runInAction } from "mobx";

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
      // TODO request created need to set in store
      const result: Question = await api(getQuestionById, undefined, { id });
      const question: Question = {
        id: "123",
        description: "asd",
        options: "shortAnswer",
      };
      return question;
    } catch (e) {
      console.log(e);
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
      // TODO we get questions as array number so we need to request each question with id

      // runInAction(() => {
      //   this.data = result;
      // });
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };
}

export default new SurveyStore();
