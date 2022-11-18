import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import user from 'src/store/user';

import Surveys from '.';

user.data = { ...user.data, role: 'user' };

describe('Surveys page', () => {
  test('render surveys', async () => {
    const { findByText, container } = render(
      <BrowserRouter>
        <Surveys />
      </BrowserRouter>,
    );

    expect(await findByText('Loading...')).not.toBeInTheDocument();

    // TODO add noraml statement
    expect(container).toBeInTheDocument();
  });
});
