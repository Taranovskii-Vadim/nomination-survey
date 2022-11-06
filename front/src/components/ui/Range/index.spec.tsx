import React from 'react';
import { render } from '@testing-library/react';

import Range, { areEqual } from '.';

describe('Range', () => {
  const isDisabled = false;
  const callback = jest.fn();

  test('render', () => {
    const { container } = render(<Range onChange={callback} />);

    expect(container).toBeInTheDocument();
  });

  test('areEqual method with isDisabled', () => {
    const result = areEqual({ isDisabled }, { isDisabled: true });

    expect(result).toBe(false);
  });

  test('areEqual method', () => {
    const result = areEqual({ isDisabled }, { isDisabled });

    expect(result).toBe(true);
  });
});
