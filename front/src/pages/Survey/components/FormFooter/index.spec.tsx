import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FormFooter from '.';

describe('FormFooter', () => {
  const callback = jest.fn();

  test('render for user', () => {
    const { container } = render(
      <FormFooter isAdmin={false} isSubmiting="finish" surveyStatus="ready" setNextStatus={callback} />,
    );

    expect(container).toBeInTheDocument();
  });

  test('handleClick for admin', () => {
    const { getByRole } = render(
      <FormFooter isAdmin isSubmiting="finish" surveyStatus="ready" setNextStatus={callback} />,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(callback).toBeCalled();
  });
});
