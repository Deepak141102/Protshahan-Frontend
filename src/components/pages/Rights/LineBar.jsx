import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";

// Register necessary components
ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

// Import JSON data
import scholarshipData from "./Data.json";

const ScholarshipLineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [supportRequestData, setSupportRequestData] = useState(null);

  useEffect(() => {
    // Extracting labels and data from the JSON
    const categories = Object.keys(scholarshipData.categories_of_scholarship);
    const percentages = Object.values(
      scholarshipData.categories_of_scholarship
    ).map((item) => item.percentage);

    // Setting up data for the line chart
    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Scholarship Percentage",
          data: percentages,
          borderColor: "#e8461e",
          backgroundColor: "red",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#212331",
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total 628`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage (%)",
          color:'#e8461e'
        },
      },
      x: {
        title: {
          display: true,
          text: "Scholarship Category",
        },
      },
    },
  };

  // Set up support chart data
  useEffect(() => {
    // Extract support types and their percentages from the imported data
    const supportTypes = scholarshipData.support_request.support_types;
    const labels = supportTypes.map((item) => item.type);
    const data = supportTypes.map((item) => item.percentage_of_total);

    setSupportRequestData({
      labels: labels,
      datasets: [
        {
          label: "Support Request Distribution",
          data: data,
          backgroundColor: [
           "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "gray", // Color 4
            "rgb(134, 37, 15)", // Color 3
            "rgb(50, 105, 170)", // Color 5 // In Kind Scholarship Support
          ],
         
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const supportRequestOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${scholarshipData.support_request.total_entries}`; // Show percentage in tooltip
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col bg-[#dcdcdc] py-4">
        <div className="w-[45%] max-md:w-full h-[80vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-2xl text-[#333] mb-5 text-center">
            Scholarship Categories Distribution
          </h2>

          {chartData && <Line data={chartData} options={options} />}
        </div>

        {/* Support Request Doughnut Chart */}
        <div className="w-[45%] max-md:w-full h-[80vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-2xl text-[#333] mb-5 text-center pt-3">
            Support Request Doughnut Chart
          </h2>
          <div className="w-[78%] max-md:w-full">
            {supportRequestData && (
              <Doughnut
                data={supportRequestData}
                options={supportRequestOptions}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipLineChart;
