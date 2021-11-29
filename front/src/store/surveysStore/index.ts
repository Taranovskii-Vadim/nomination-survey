import { action, makeObservable, observable, runInAction } from "mobx";

import { api } from "../../routes/api";
import getSurveys from "../../routes/api/getSurveys";

import { SurveyRenderItem } from "./types";

class Surveys {
  loading = true;

  data: SurveyRenderItem[] = [];

  constructor() {
    makeObservable(this, {
      loading: observable,

      setLoading: action,
    });
  }

  setLoading = (value: boolean): void => {
    this.loading = value;
  };

  fetchSurveys = async (): Promise<void> => {
    try {
      const result = await api(getSurveys);

      runInAction(() => {
        this.data = result;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };
}

export default new Surveys();
