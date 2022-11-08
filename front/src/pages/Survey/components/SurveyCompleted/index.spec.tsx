import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import SurveyCompleted from '.';

describe('SurveyCompleted', () => {
  test('render', () => {
    const { container } = render(
      <Router>
        <SurveyCompleted />
      </Router>,
    );

    expect(container).toBeInTheDocument();
  });
});
