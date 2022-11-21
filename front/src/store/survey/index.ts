import { action, makeObservable, observable, runInAction } from 'mobx';

import { api } from '../../api';
import getSurveyById from '../../api/getSurveyById';
import postSurveyResults from '../../api/postSurveyResults';
import putNextSurveyStatus from '../../api/putNextSurveyStatus';
import getSurveyChartResults from '../../api/getSurveyChartResults';

import { SurveyStatus } from '../types';
import { UserRole } from '../user/types';

import { ChartData, FormLoading, Survey, UserAnswer } from './types';

// TODO fix all mobx warnings

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

      changeIsSurveyLoading: action,
    });
  }

  changeIsSurveyLoading = (value: boolean): void => {
    this.isSurveyLoading = value;
  };

  fetchSurveyById = async (id: number): Promise<void> => {
    try {
      this.changeIsSurveyLoading(true);
      const { survey, isUserVoted } = await api(getSurveyById, undefined, id);

      runInAction(() => {
        this.data = survey;
        this.surveyCompleted = isUserVoted;
      });
    } finally {
      this.changeIsSurveyLoading(false);
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

      const newStatus = await api(putNextSurveyStatus, { status }, this.data.id);

      this.data.status = newStatus;
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
