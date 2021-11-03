import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ xaxis, yaxis }) => {
  return (
    <div className="chart">
      <Line
        data={{
          labels: xaxis,
          datasets: [
            {
              label: "test",
              data: yaxis,
              fill: false,
              tension: 0.25,
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 5,
              pointRadius: 0.09,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          responsive: true,

          plugins: {
            title: {
              display: true,
              Text: "Dividend Payments",
            },
          },
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default Chart;
