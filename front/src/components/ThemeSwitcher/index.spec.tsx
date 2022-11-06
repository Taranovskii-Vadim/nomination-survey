import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ThemeSwitcher from '.';

describe('ThemeSwitcher', () => {
  test('toggle method', () => {
    const { getByTestId } = render(<ThemeSwitcher />);

    const node = getByTestId('test');

    fireEvent.click(node);

    expect(node).toBeInTheDocument();
  });
});
