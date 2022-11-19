import postLogin from './postLogin';
import putNextSurveyStatus from './putNextSurveyStatus';
import { POST_LOGIN, PUT_SURVEY_STATUS } from './constants';

describe('api routes', () => {
  describe('postLogin endpoint', () => {
    test('getUrl method', () => {
      const value = 'test';
      const result = postLogin.getUrl(value);

      expect(result).toBe(`${POST_LOGIN}/${value}`);
    });
  });

  describe('putSurveyStatus', () => {
    test('getUrl method', () => {
      const value = 1;
      const result = putNextSurveyStatus.getUrl(value);

      expect(result).toBe(`${PUT_SURVEY_STATUS}/${value}`);
    });
  });
});
