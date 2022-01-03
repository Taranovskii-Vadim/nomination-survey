import React from "react";
import { Bar } from "react-chartjs-2";

import { ChartData } from "../../store/surveyStore/types";

interface Props {
  chart: ChartData;
}

const BarChart = ({ chart }: Props): JSX.Element => {
  return (
    <Bar
      data={{
        labels: Object.keys(chart),
        datasets: [
          {
            label: "Результаты",
            data: Object.values(chart),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
            ],
            borderWidth: 1,
            barPercentage: 0.5,
          },
        ],
      }}
    />
  );
};

export default BarChart;
