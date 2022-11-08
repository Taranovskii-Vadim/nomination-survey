import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import user from 'src/store/user';

import General from '.';

describe('General page', () => {
  test('render', () => {
    user.data = { role: 'user', ...user.data };

    const { container } = render(
      <Router>
        <General />
      </Router>,
    );

    expect(container).toBeInTheDocument();
  });
});
