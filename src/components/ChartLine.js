import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ xaxis, yaxis, title }) => {
  if (xaxis == null) return null;
  else {
    return (
      <div className="chart">
        <Line
          data={{
            labels: xaxis,
            datasets: [
              {
                label: null,

                data: yaxis,
                fill: false,
                tension: 0.25,
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 5,
                pointRadius: 0.09,
              },
            ],
          }}
          height={300}
          width={600}
          options={{
            responsive: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            title: {
              display: true,
              Text: "Dividend Payments",
            },

            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
};

export default Chart;
