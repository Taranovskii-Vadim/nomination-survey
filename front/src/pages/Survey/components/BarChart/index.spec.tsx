import { render } from '@testing-library/react';
import React from 'react';

import SurveyStore from 'src/store/survey';

import BarChart from '.';

const store = new SurveyStore();
// TODO caheck and fix errors whilte test running
describe('BarChart', () => {
  test('render without data', () => {
    const { container } = render(<BarChart store={store} />);

    expect(container).toBeInTheDocument();
  });

  test('render with data', () => {
    store.chartData = { 1: 5, 2: 3, 3: 8 };
    const { container } = render(<BarChart store={store} />);

    expect(container).toBeInTheDocument();
  });

  test('render chart loader', () => {
    store.isChartLoading = true;
    const { getByText } = render(<BarChart store={store} />);
    const result = getByText('Загрузка данных');

    expect(result).toBeInTheDocument();
  });
});
