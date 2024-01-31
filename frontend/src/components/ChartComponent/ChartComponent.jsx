import React from "react";
import ReactFC from "react-fusioncharts";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Chart as ChartJS } from "chart.js";

function ChartComponent() {
  Chart.register(...registerables);

  const salesData = [5, 3, 4, 56, 7, 34, 56, 3, 8, 56, 34, 10];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      colors: {
        enabled: true,
      },

      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return "";
          },
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += "Sales";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} Sales`;
            }
            return label;
          },
          afterLabel: (tooltipItem) => {
            return tooltipItem.label;
          },
          labelColor() {
            return {
              borderColor: "transparent",
              backgroundColor: "transparent",
              borderWidth: 3,
            };
          },
          labelTextColor: function (context) {
            return "#050305";
          },
          afterLabelTextColor: function (context) {
            return "#495434";
          },
        },

        backgroundColor: "#fff",
        borderColor: "#frfrfr",
        usePointStyle: false,
        showShadow: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const labels = salesData.map((_, index) => months[index % 12]);
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: "#7E30E1",
        data: salesData,
        barPercentage: 1,
        borderRadius: 0,
        borderSkipped: false,
      },
    ],
  };

  const graphStyle = {
    minHeight: "10rem",
    maxWidth: "540px",
    width: "100%",
    border: "1px solid #c4c4c4",
    borderRadius: "10px",
    padding: "1rem",
  };

  return (
    <div style={graphStyle}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartComponent;
