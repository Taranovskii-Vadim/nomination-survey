import React from 'react';
import { render } from '@testing-library/react';

import user from 'src/store/user';

import Surveys from '.';

user.data = { ...user.data, role: 'user' };

describe('Surveys page', () => {
  test('render surveys', async () => {
    const { findByText, container } = render(<Surveys />);

    expect(await findByText('Loading...')).not.toBeInTheDocument();

    // TODO add noraml statement
    expect(container).toBeInTheDocument();
  });
});
