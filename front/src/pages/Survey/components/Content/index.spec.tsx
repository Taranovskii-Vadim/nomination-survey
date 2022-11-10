import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import SurveyStore from 'src/store/survey';
import user from 'src/store/user';

import Content from '.';

const store = new SurveyStore();

describe('Content', () => {
  const fullname = 'test';
  store.data = { id: 1, title: 'test', description: 'test', status: 'userVote', questions: [{ id: 1, text: 'test' }] };

  test('isHaveAccessToTabs', () => {
    user.data = { role: 'user', fullname };

    const { container } = render(
      <BrowserRouter>
        <Content store={store} />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  test('form submit', () => {
    user.data = { role: 'chief', fullname };
    store.data = { ...store.data, status: 'chiefVote' };

    const { container, getAllByRole } = render(
      <BrowserRouter>
        <Content store={store} />
      </BrowserRouter>,
    );

    const tabs = getAllByRole('tab');

    fireEvent.click(tabs[1]);
    fireEvent.click(tabs[2]);
    fireEvent.click(tabs[0]);

    const form = container.querySelector('form');

    fireEvent.submit(form);

    expect(form).toBeInTheDocument();
  });

  test('set next survey status', () => {
    store.surveyCompleted = false;
    user.data = { role: 'admin', fullname };

    const { getByRole } = render(
      <BrowserRouter>
        <Content store={store} />
      </BrowserRouter>,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  test('access denied', () => {
    user.data = { role: 'user', fullname };

    const { container } = render(
      <BrowserRouter>
        <Content store={store} />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  test('surveyCompleted', () => {
    user.data = { role: 'chief', fullname };
    store.surveyCompleted = true;

    const { container } = render(
      <BrowserRouter>
        <Content store={store} />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
