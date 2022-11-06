import React from 'react';
import { render } from '@testing-library/react';
import { GiSightDisabled } from 'react-icons/gi';

import Icon from '.';
import { getBoxSize } from './helpers';

describe('helpers', () => {
  test('getBoxSize method with size small', () => {
    const result = getBoxSize('small');

    expect(result).toBe(1);
  });

  test('getBoxSize method with size large', () => {
    const result = getBoxSize('large');

    expect(result).toBe(12);
  });
});

describe('Icon', () => {
  test('render', () => {
    const { container } = render(<Icon as={GiSightDisabled} />);

    expect(container).toBeInTheDocument();
  });

  test('render with size number', () => {
    const { container } = render(<Icon as={GiSightDisabled} size={35} />);

    expect(container).toBeInTheDocument();
  });
});
