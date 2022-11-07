import React from 'react';
import { render } from '@testing-library/react';

import { firstLetterToUpperCase } from 'src/utils';

import FormItemTitle, { areEqual } from '.';

describe('FormItemTitle', () => {
  const label = 'test';

  test('render', () => {
    const { getByText } = render(<FormItemTitle id={1} label={label} />);

    const result = getByText(firstLetterToUpperCase(label));

    expect(result).toBeInTheDocument();
  });

  test('areEqual method', () => {
    const result = areEqual({ id: 1, label }, { id: 1, label });

    expect(result).toBe(true);
  });
});
