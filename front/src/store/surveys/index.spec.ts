import SurveysStore from '.';

const store = new SurveysStore();

describe('surveys store', () => {
  test('fetchSurveys method', async () => {
    await store.fetchSurveys();

    expect(store.data).toBeDefined();
    expect(store.loading).toBe(false);
  });
});
