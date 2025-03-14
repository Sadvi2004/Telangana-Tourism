import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ tourismData, chartType }) {
  const labels = tourismData.map((row) => row.Year || row.Month || row.Season);
  const visitors = tourismData.map((row) => row.Visitors);

  const data = {
    labels,
    datasets: [
      {
        label: "Visitors",
        data: visitors,
        backgroundColor: "rgba(232, 149, 15, 0.6)",
        borderColor: "rgb(232,149,15,0.6)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">{chartType}</h2>
      <div className="chart-wrapper">
        {chartType === "Bar Chart" ? (
          <Bar data={data} options={options} className="chart-text" />
        ) : (
          <Line data={data} options={options} className="chart-text" />
        )}
      </div>
    </div>
  );
}

export default Chart;
