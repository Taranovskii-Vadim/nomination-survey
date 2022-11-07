import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import AccessDenied from '.';

const Component = (
  <Router>
    <AccessDenied />
  </Router>
);
// TODO maybe this test useless if we can test accessDineid in survey component
describe('AccessDenied', () => {
  test('render component', () => {
    const { getByText } = render(Component);

    const result = getByText('На главную');

    expect(result).toBeInTheDocument();
  });
});
