import React from 'react';
import { render } from '@testing-library/react';

import Survey from '.';

describe('Survey', () => {
  test('render', () => {
    const { container } = render(<Survey />);

    expect(container).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
