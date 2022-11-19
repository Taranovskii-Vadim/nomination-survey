import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import user from 'src/store/user';

import Survey from '.';

describe('Survey', () => {
  test('access denied', async () => {
    user.data = { ...user.data, role: 'user' };
    const { findByText, container } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>,
    );

    expect(await findByText('Loading...')).not.toBeInTheDocument();

    expect(container).toBeInTheDocument();
  });

  test('form submit', async () => {
    user.data = { ...user.data, role: 'chief' };
    const { findByText, getAllByRole, container } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>,
    );

    expect(await findByText('Loading...')).not.toBeInTheDocument();

    const tabs = getAllByRole('tab');

    fireEvent.click(tabs[1]);
    fireEvent.click(tabs[2]);
    fireEvent.click(tabs[0]);

    const form = container.querySelector('form');

    fireEvent.submit(form);

    expect(form).toBeInTheDocument();
  });
});
