import React from 'react';
import { render } from '@testing-library/react';

import FullPageContainer from '.';

describe('FullPageContainer', () => {
  test('render', () => {
    const text = 'Hello world';
    const { getByText } = render(<FullPageContainer>{text}</FullPageContainer>);
    const result = getByText(text);

    expect(result).toBeInTheDocument();
  });
});
