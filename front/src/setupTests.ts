import '@testing-library/jest-dom/extend-expect';

const surveys = [
  { id: 1, title: 'test', status: 'ready' },
  { id: 2, title: 'test', status: 'userVote' },
];

jest.mock('axios', () => ({
  create: () => ({
    request: () => Promise.resolve({ data: { surveys } }),
    interceptors: {
      response: {
        use: jest.fn(() => {}),
      },
    },
  }),
}));
