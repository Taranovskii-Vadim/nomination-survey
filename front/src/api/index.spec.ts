import postLogin from './postLogin';
import postSurveyResults from './postSurveyResults';
import putNextSurveyStatus from './putNextSurveyStatus';
import getProfile, { ResultDTO as GetProfileDTO } from './getProfile';
import getSurveys, { ResultDTO as GetSurveysDTO } from './getSurveys';
import getSurveyById, { ResultDTO as GetSurveyByIdDTO } from './getSurveyById';
import getSurveyChartResults, { ResultDTO as GetSurveyChartResultsDTO } from './getSurveyChartResults';
import {
  POST_LOGIN,
  GET_PROFILE,
  GET_SURVEYS,
  GET_SURVEY_BY_ID,
  PUT_SURVEY_STATUS,
  POST_SURVEY_RESULTS,
  GET_SURVEY_CHART_RESULTS,
} from './constants';

describe('api routes', () => {
  describe('getProfile endpoint', () => {
    test('getUrl method', () => {
      const result = getProfile.getUrl();

      expect(result).toBe(GET_PROFILE);
    });

    test('getData method', () => {
      const payload: GetProfileDTO = { fullname: 'Test', role: 'admin' };
      const result = getProfile.getData({ result: payload });

      expect(result).toEqual(payload);
    });
  });

  describe('getSurveys endpoint', () => {
    test('getUrl method', () => {
      const result = getSurveys.getUrl();

      expect(result).toBe(GET_SURVEYS);
    });

    test('getData method', () => {
      const payload: GetSurveysDTO[] = [{ id: 1, title: 'test', status: 'ready' }];
      const result = getSurveys.getData({ result: payload });

      expect(result).toEqual(payload);
    });
  });

  describe('postLogin endpoint', () => {
    test('getUrl method', () => {
      const value = 'test';
      const result = postLogin.getUrl(value);

      expect(result).toBe(`${POST_LOGIN}/${value}`);
    });
  });

  describe('postSurveyResults', () => {
    test('getUrl method', () => {
      const value = 1;
      const result = postSurveyResults.getUrl(value);

      expect(result).toBe(`${POST_SURVEY_RESULTS}/${value}`);
    });
  });

  describe('putSurveyStatus', () => {
    test('getUrl method', () => {
      const value = 1;
      const result = putNextSurveyStatus.getUrl(value);

      expect(result).toBe(`${PUT_SURVEY_STATUS}/${value}`);
    });
  });

  describe('getSurveyChartResults endpoint', () => {
    test('getUrl method', () => {
      const value = 'test';
      const result = getSurveyChartResults.getUrl(value);

      expect(result).toBe(`${GET_SURVEY_CHART_RESULTS}/${value}`);
    });

    test('getData method', () => {
      const payload: GetSurveyChartResultsDTO = { test: 1 };
      const result = getSurveyChartResults.getData({ result: payload });

      expect(result).toEqual(payload);
    });
  });

  describe('getSurveyById endpoint', () => {
    test('getUrl method', () => {
      const value = 1;
      const result = getSurveyById.getUrl(value);

      expect(result).toBe(`${GET_SURVEY_BY_ID}/${value}`);
    });

    test('getData method', () => {
      const isUserVoted = true;

      const data: GetSurveyByIdDTO['survey'] = {
        id: 1,
        title: 'string',
        questions: [{ id: 1, text: 'string' }],
        description: 'string',
        status: 'ready',
      };

      const payload: GetSurveyByIdDTO = { isUserVoted, survey: data };

      const result = getSurveyById.getData({ result: payload });

      expect(result).toEqual({ isUserVoted, data });
    });
  });
});
