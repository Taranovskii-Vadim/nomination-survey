import React from 'react';
import { render } from '@testing-library/react';

import user from 'src/store/user';

import General from '.';

// TODO check all children test after survey page cover because child tests can be useless

describe('General page', () => {
  test('render', () => {
    user.data = { role: 'user', ...user.data };

    const { container } = render(<General />);

    expect(container).toBeInTheDocument();
  });
});
