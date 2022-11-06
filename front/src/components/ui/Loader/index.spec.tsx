import React from 'react';
import { render } from '@testing-library/react';

import Loader from '.';

describe('Loader', () => {
  test('render', () => {
    const text = 'Loading...';
    const { getByText } = render(<Loader containerHeight="400px" text={text} />);
    const result = getByText(text);

    expect(result).toBeInTheDocument();
  });
});
