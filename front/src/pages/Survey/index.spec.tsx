import React from 'react';
import { render } from '@testing-library/react';

import Survey from '.';
import user from 'src/store/user';

describe('Survey page', () => {
  test('change tabs', () => {
    user.data = { role: 'admin', ...user.data };
    const { container } = render(<Survey />);

    expect(container).toBeInTheDocument();
  });
});
