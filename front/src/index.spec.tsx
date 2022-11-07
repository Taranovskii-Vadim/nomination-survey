import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
import user from './store/user';

describe('App', () => {
  test('render with login form', () => {
    user.isLoginForm = true;
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });

  test('render without login form', () => {
    user.isLoginForm = false;
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
