import React from 'react';
import { render } from '@testing-library/react';

import { firstLetterToUpperCase } from 'src/utils';

import SurveyCard from '.';

describe('SurveyCard', () => {
  test('render with isActive flag', () => {
    const value = 'test';
    const { getByText } = render(<SurveyCard title={value} isActive />);
    const result = getByText(firstLetterToUpperCase(value));

    expect(result).toBeInTheDocument();
  });
});
