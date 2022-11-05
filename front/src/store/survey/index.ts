import { makeObservable, observable, runInAction } from 'mobx';

import { api } from '../../api';
import getSurveyById from '../../api/getSurveyById';
import postSurveyResults from '../../api/postSurveyResults';
import putNextSurveyStatus from '../../api/putNextSurveyStatus';
import getSurveyChartResults from '../../api/getSurveyChartResults';

import { SurveyStatus } from '../types';
import { UserRole } from '../user/types';

import { ChartData, FormLoading, Survey, UserAnswer } from './types';

class SurveyStore {
  surveyCompleted = false;

  data: Survey = undefined;

  chartData: ChartData = {};

  isSurveyLoading = false;

  isChartLoading = false;

  formLoading: FormLoading = '';

  constructor() {
    makeObservable(this, {
      formLoading: observable,
      isChartLoading: observable,
      isSurveyLoading: observable,
    });
  }

  fetchSurveyById = async (id: string): Promise<void> => {
    try {
      this.isSurveyLoading = true;
      const { isUserVoted, data } = await api(getSurveyById, undefined, id);

      runInAction(() => {
        this.data = data;
        this.surveyCompleted = isUserVoted;
      });
    } finally {
      this.isSurveyLoading = false;
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
      this.isChartLoading = true;
      const chartResult = await api(getSurveyChartResults, undefined, `${role}/${this.data.id}`);

      runInAction(() => {
        this.chartData = chartResult;
      });
    } finally {
      this.isChartLoading = false;
    }
  };
}

export default SurveyStore;
