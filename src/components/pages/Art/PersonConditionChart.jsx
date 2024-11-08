import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import personConditionsData from "./beat.json"; // Make sure to replace with the correct path for your data

// Register the necessary components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PersonConditionsLineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const personConditions = personConditionsData.person_conditions;
    const conditions = Object.keys(personConditions); // Array of conditions
    const counts = Object.values(personConditions); // Array of counts

    // Prepare data for Line Chart
    setChartData({
      labels: conditions, // x-axis labels (person condition names)
      datasets: [
        {
          label: "Person Conditions Count",
          data: counts, // y-axis values (counts)
          borderColor: "rgba(75, 192, 192, 1)", // Line color
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Background area color
          fill: true, // Fills the area under the line
          tension: 0.3, // Smooth curve for the line
          pointRadius: 5, // Radius of the points
          borderWidth: 2, // Line width
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null, // Disable the default filter behavior
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Tooltip with custom text
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Person Conditions",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true, // Make sure y-axis starts from zero
      },
    },
  };

  return (
    <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col">
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
          Person Conditions Line Chart
        </h2>
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default PersonConditionsLineChart;
