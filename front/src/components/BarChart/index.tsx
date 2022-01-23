import React from "react";
import { Bar } from "react-chartjs-2";
import { Flex, Text } from "@chakra-ui/react";

import { ChartData } from "../../store/surveyStore/types";
import { getColors } from "./helpers";
import { FireIcon } from "../icons";

interface Props {
  chart: ChartData;
}

const BarChart = ({ chart }: Props): JSX.Element => {
  const keys = Object.keys(chart);

  if (!keys.length) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <FireIcon size="large" />
        <Text mt="5" fontSize="2xl">
          Голосование в самом разгаре, результаты скоро будут доступны...
        </Text>
      </Flex>
    );
  }

  const [backgroundColor, borderColor] = getColors(keys.length);

  return (
    <Bar
      data={{
        labels: keys,
        datasets: [
          {
            label: "Результаты",
            data: Object.values(chart),
            backgroundColor,
            borderColor,
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

export default BarChart;
