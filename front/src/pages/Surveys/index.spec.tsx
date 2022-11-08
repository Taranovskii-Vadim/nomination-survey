import React from 'react';
import { render } from '@testing-library/react';

import Surveys from '.';

describe('Surveys page', () => {
  test('render', () => {
    const { container } = render(<Surveys />);

    expect(container).toBeInTheDocument();
  });
});
