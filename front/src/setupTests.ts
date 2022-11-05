import '@testing-library/jest-dom/extend-expect';

jest.mock('axios', () => ({
  create: () => ({
    request: () => Promise.resolve({ data: { result: [] } }),
    interceptors: {
      response: {
        use: jest.fn,
      },
    },
  }),
}));
