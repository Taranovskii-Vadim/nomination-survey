import React from 'react';
import { render } from '@testing-library/react';

import Button, { areEqual } from '.';

describe('Button', () => {
  const label = 'test';

  test('render', () => {
    const { getByText } = render(<Button label={label} />);
    const result = getByText(label);

    expect(result).toBeInTheDocument();
  });

  test('areEqual method with isLoading', () => {
    const result = areEqual({ label, isLoading: false }, { label, isLoading: true });

    expect(result).toBe(false);
  });

  test('areEqual method with disabled', () => {
    const result = areEqual({ label, disabled: false }, { label, disabled: true });

    expect(result).toBe(false);
  });

  test('areEqual method with label', () => {
    const result = areEqual({ label }, { label: 'new' });

    expect(result).toBe(false);
  });

  test('areEqual method', () => {
    const result = areEqual({ label }, { label });

    expect(result).toBe(true);
  });
});
