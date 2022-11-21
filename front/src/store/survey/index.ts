import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getSurveyById from 'src/api/getSurveyById';
import postSurveyResults from 'src/api/postSurveyResults';
import putNextSurveyStatus from 'src/api/putNextSurveyStatus';
import getSurveyChartResults from 'src/api/getSurveyChartResults';

import { SurveyStatus } from '../types';
import { UserRole } from '../user/types';

import { ChartData, FormLoading, Survey, UserAnswer } from './types';

class SurveyStore {
  surveyCompleted = false;

  data: Survey = undefined;

  chartData: ChartData = {};

  isSurveyLoading = false;

  isChartLoading = false;

  isFormLoading: FormLoading = '';

  constructor() {
    makeObservable(this, {
      isFormLoading: observable,
      isChartLoading: observable,
      isSurveyLoading: observable,

      changeIsFormLoading: action,
      changeIsChartLoading: action,
      changeIsSurveyLoading: action,
    });
  }

  changeIsSurveyLoading = (value: boolean): void => {
    this.isSurveyLoading = value;
  };

  changeIsChartLoading = (value: boolean): void => {
    this.isChartLoading = value;
  };

  changeIsFormLoading = (value: FormLoading): void => {
    this.isFormLoading = value;
  };

  fetchSurveyById = async (id: number): Promise<void> => {
    try {
      this.changeIsSurveyLoading(true);
      const { survey, isUserVoted } = await api(getSurveyById, undefined, id);

      this.data = survey;
      this.surveyCompleted = isUserVoted;
    } finally {
      this.changeIsSurveyLoading(false);
    }
  };

  sendUserAnswer = async (data: UserAnswer): Promise<void> => {
    try {
      this.changeIsFormLoading('finish');
      await api(postSurveyResults, data, this.data.id);

      this.surveyCompleted = true;
    } finally {
      this.changeIsFormLoading('');
    }
  };

  setNextSurveyStatus = async (status: SurveyStatus): Promise<void> => {
    try {
      this.changeIsFormLoading('nextStatus');

      const newStatus = await api(putNextSurveyStatus, { status }, this.data.id);

      this.data.status = newStatus;
    } finally {
      this.changeIsFormLoading('');
    }
  };

  fetchChartResults = async (role: UserRole): Promise<void> => {
    try {
      this.changeIsChartLoading(true);
      const chartResult = await api(getSurveyChartResults, undefined, `${role}/${this.data.id}`);

      this.chartData = chartResult;
    } finally {
      this.changeIsChartLoading(false);
    }
  };
}

export default SurveyStore;
