import React from 'react';
import { render } from '@testing-library/react';

import Pages from '.';
import { isHaveAccess } from './helpers';

describe('helpers', () => {
  test('isHaveAccess function for admin', () => {
    const result = isHaveAccess('admin', 'ready');

    expect(result).toBe(true);
  });

  test('isHaveAccess function for chief', () => {
    const result = isHaveAccess('chief', 'chiefVote');

    expect(result).toBe(true);
  });

  test('isHaveAccess function for user', () => {
    const result = isHaveAccess('user', 'userVote');

    expect(result).toBe(true);
  });

  test('isHaveAccess function for chief and finished', () => {
    const result = isHaveAccess('chief', 'finished');

    expect(result).toBe(false);
  });
});

describe('Pages', () => {
  test('render', () => {
    const { container } = render(<Pages />);

    expect(container).toBeInTheDocument();
  });
});
