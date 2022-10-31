import React from 'react';
import { observer } from 'mobx-react-lite';
import { Bar } from 'react-chartjs-2';
import { ImFire } from 'react-icons/im';
import { Flex, Text } from '@chakra-ui/react';

import SurveyStore from 'src/store/survey';

import Loader from 'src/components/ui/Loader';
import Icon from 'src/components/Icon';

interface Props {
  store: SurveyStore;
}

const BarChart = ({ store }: Props): JSX.Element => {
  if (store.isChartLoading) {
    return <Loader containerHeight="50vh" text="данных" />;
  }

  const keys = Object.keys(store.chartData);

  if (!keys.length) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Icon as={ImFire} size="large" />
        <Text mt="5" fontSize="2xl">
          Голосование в самом разгаре, результаты скоро будут доступны...
        </Text>
      </Flex>
    );
  }

  return (
    <Bar
      data={{
        labels: keys,
        datasets: [
          {
            label: 'Результаты',
            data: Object.values(store.chartData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 0.5,
            barPercentage: 0.5,
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0,
              },
            },
          ],
        },
      }}
    />
  );
};

export default observer(BarChart);
