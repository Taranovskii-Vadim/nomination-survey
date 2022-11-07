import React from 'react';
import { render } from '@testing-library/react';

import Survey from '.';
import user from 'src/store/user';

// TODO check all children test after survey page cover because child tests can be useless

describe('Survey page', () => {
  test('change tabs', () => {
    user.data = { role: 'admin', ...user.data };
    const { container } = render(<Survey />);

    expect(container).toBeInTheDocument();
  });
});
