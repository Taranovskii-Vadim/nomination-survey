import '@testing-library/jest-dom/extend-expect';

// TODO think how to mock axios correctly
jest.mock('axios', () => ({
  create: () => ({
    request: () => {
      const result = new Object([
        { id: 1, title: 'first', status: 'ready' },
        { id: 2, title: 'second', status: 'userVote' },
      ]);

      result.survey = {};

      return Promise.resolve({ data: { result } });
    },
    interceptors: {
      response: {
        use: jest.fn,
      },
    },
  }),
}));
