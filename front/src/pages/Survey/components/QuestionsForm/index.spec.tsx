import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import QuestionsForm from '.';

describe('Questions form', () => {
  test('render', () => {
    const callback = jest.fn();
    const { container } = render(
      <QuestionsForm
        data={[{ id: 1, text: 'test' }]}
        userRole="user"
        isSubmiting="finish"
        surveyStatus="userVote"
        sendSurveyResults={callback}
        setNextStatus={callback}
      />,
    );

    const form = container.querySelector('form');

    fireEvent.submit(form);

    expect(form).toBeInTheDocument();
  });
});
