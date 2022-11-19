import '@testing-library/jest-dom/extend-expect';

const surveys = [
  { id: 1, title: 'test', status: 'ready' },
  { id: 2, title: 'test', status: 'userVote' },
];

const survey = {
  id: 1,
  title: 'survey',
  status: 'chiefVote',
  description: 'test',
  questions: [
    { id: 1, text: 'test question 1' },
    { id: 2, text: 'test question 2' },
  ],
};

const chart = { 1: 2, 2: 3, 3: 2, 4: 1, 5: 10 };

const profile = { fullname: 'test', role: 'admin' };

jest.mock('axios', () => ({
  create: () => ({
    request: () => Promise.resolve({ data: { surveys, survey, isUserVoted: false, chart, profile } }),
    interceptors: {
      response: {
        use: jest.fn(() => {}),
      },
    },
  }),
}));
