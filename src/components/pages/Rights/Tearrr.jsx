import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import JsonData from "../json/rights/Data.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ScholarshipBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const scholarshipCategory = JsonData.Scholarship_category;
    
    // Extract categories and their values
    const labels = Object.keys(scholarshipCategory).filter(key => key !== "Scholar_total");
    const values = labels.map(label => scholarshipCategory[label]);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Scholarship Categories",
          data: values,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "rgb(134, 37, 15)", // Color 3
            "rgb(51, 73, 86)", // Color 4
            "rgb(102, 89, 25)", // Color 5
            "rgb(29, 114, 92)", // Color 6
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 10,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} scholarships`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Scholarship Categories",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          maxRotation: 0, // Keep the labels horizontal
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Scholarships",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Set increment to 10 for better readability
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center p-5 bg-[#dcdcdc]">
      <div className="w-full max-w-4xl h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Scholarship Category Distribution
        </h2>
        <div className="w-full h-full">
          {chartData && <Bar data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipBarChart;
