import { makeObservable, observable, runInAction } from 'mobx';

import { api } from '../../api';
import getSurveyById from '../../api/getSurveyById';
import postSurveyResults from '../../api/postSurveyResults';
import putNextSurveyStatus from '../../api/putNextSurveyStatus';
import getSurveyChartResults from '../../api/getSurveyChartResults';

import { SurveyStatus } from '../types';
import { UserRole } from '../user/types';

import { ChartData, FormLoading, Loading, Survey, UserAnswer } from './types';

// TODO hash surveys

class SurveyStore {
  surveyCompleted = false;

  data: Survey = undefined;

  chartData: ChartData = {};

  loading: Loading = 'survey';

  formLoading: FormLoading = '';

  constructor() {
    makeObservable(this, {
      loading: observable,
      formLoading: observable,
    });
  }

  fetchSurveyById = async (id: string): Promise<void> => {
    try {
      this.loading = 'survey';
      const { isUserVoted, data } = await api(getSurveyById, undefined, id);

      runInAction(() => {
        this.data = data;
        this.surveyCompleted = isUserVoted;
      });
    } finally {
      this.loading = '';
    }
  };

  sendUserAnswer = async (data: UserAnswer): Promise<void> => {
    try {
      this.formLoading = 'finish';
      await api(postSurveyResults, data, this.data.id);

      runInAction(() => {
        this.surveyCompleted = true;
      });
    } finally {
      this.formLoading = '';
    }
  };

  setNextSurveyStatus = async (status: SurveyStatus): Promise<void> => {
    try {
      this.formLoading = 'nextStatus';

      await api(putNextSurveyStatus, { status }, this.data.id);

      runInAction(() => {
        this.data.status = status;
      });
    } finally {
      this.formLoading = '';
    }
  };

  fetchChartResults = async (role: UserRole): Promise<void> => {
    try {
      this.loading = 'chart';

      const chartResult = await api(getSurveyChartResults, undefined, `${role}/${this.data.id}`);

      runInAction(() => {
        this.chartData = chartResult;
      });
    } finally {
      this.loading = '';
    }
  };
}

export default SurveyStore;
