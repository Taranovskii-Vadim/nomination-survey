import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import user from 'src/store/user';
import SurveysStore from 'src/store/surveys';
import { firstLetterToUpperCase } from 'src/utils';

import List from '.';

const store = new SurveysStore();

describe('List', () => {
  test('render with data', () => {
    const title = 'hello world';
    user.data = { role: 'user', ...user.data };

    store.data = [
      { id: 1, title, status: 'userVote' },
      { id: 2, title: 'test', status: 'ready' },
    ];

    const { getByText } = render(
      <BrowserRouter>
        <List store={store} />
      </BrowserRouter>,
    );

    const result = getByText(firstLetterToUpperCase(title));

    expect(result).toBeInTheDocument();
  });
});
