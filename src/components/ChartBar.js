import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ xaxis, yaxis, title }) => {
  if (xaxis == null) return null;
  else {
    return (
      <div className="chart">
        {/* {dividendDate}
      {dividendAmount} */}

        <Bar
          data={{
            labels: xaxis,
            datasets: [
              {
                label: title,
                data: yaxis,
                backgroundColor: ["rgba(54, 162, 235, 0.5)"],
                borderWidth: 0,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            responsive: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                Text: "Dividend Payments",
                position: "top",
                align: "center",
              },
            },
            maintainAspectRatio: true,

            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
};

export default Chart;
