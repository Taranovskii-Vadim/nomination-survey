import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Login from '.';

describe('Login', () => {
  test('form submit method', () => {
    const { container } = render(<Login />);

    const node = container.querySelector('form');

    fireEvent.submit(node);

    expect(node).toBeInTheDocument();
  });
});
