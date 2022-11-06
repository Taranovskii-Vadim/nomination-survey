import SurveyStore from '.';
import { SurveyStatus } from '../types';

const store = new SurveyStore();

describe('survey store', () => {
  test('fetchSurveyById method', async () => {
    await store.fetchSurveyById(1);

    expect(store.data).toBeDefined();
    expect(store.isSurveyLoading).toBe(false);
  });

  test('sendUserAnswer method', async () => {
    store.data = { id: 1, ...store.data };
    await store.sendUserAnswer({ 1: 5, 2: 3 });

    expect(store.surveyCompleted).toBe(true);
  });

  test('setNextSurveyStatus method', async () => {
    const status: SurveyStatus = 'ready';
    await store.setNextSurveyStatus(status);

    expect(store.data.status).toBe(status);
  });

  test('fetchChartResults method', async () => {
    await store.fetchChartResults('admin');

    expect(store.chartData).toBeDefined();
  });
});
