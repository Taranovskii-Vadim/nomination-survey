import { action, makeObservable, observable, runInAction } from "mobx";

import { api } from "../../api";
import getSurveys from "../../api/getSurveys";

import { CommonSurveyFields } from "../types";

class SurveysStore {
  loading = true;

  data: CommonSurveyFields[] = [];

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

export default SurveysStore;
