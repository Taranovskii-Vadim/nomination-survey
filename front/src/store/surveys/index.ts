import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getSurveys from '../../api/getSurveys';

import { CommonSurveyFields } from '../types';

class SurveysStore {
  loading = true;

  data: CommonSurveyFields[] = [];

  constructor() {
    makeObservable(this, {
      loading: observable,

      changeLoading: action,
    });
  }

  changeLoading = (value: boolean): void => {
    this.loading = value;
  };

  fetchSurveys = async (): Promise<void> => {
    try {
      const result = await api(getSurveys);

      this.data = result;
    } finally {
      this.changeLoading(false);
    }
  };
}

export default SurveysStore;
