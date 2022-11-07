import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import AccessDenied from '.';

const Component = (
  <Router>
    <AccessDenied />
  </Router>
);

describe('AccessDenied', () => {
  test('render component', () => {
    const { getByText } = render(Component);

    const result = getByText('На главную');

    expect(result).toBeInTheDocument();
  });
});
