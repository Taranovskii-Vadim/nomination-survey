import { makeObservable, observable, runInAction } from 'mobx';

import { api } from '../../api';
import getSurveys from '../../api/getSurveys';

import { CommonSurveyFields } from '../types';

class SurveysStore {
  loading = true;

  data: CommonSurveyFields[] = [];

  constructor() {
    makeObservable(this, {
      loading: observable,
    });
  }

  fetchSurveys = async (): Promise<void> => {
    try {
      const result = await api(getSurveys);

      runInAction(() => {
        this.data = result;
      });
    } finally {
      this.loading = false;
    }
  };
}

export default SurveysStore;
