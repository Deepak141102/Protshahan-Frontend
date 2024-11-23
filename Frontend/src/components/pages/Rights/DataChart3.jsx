import React, { useState, useRef, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import JsonData from "../json/rights/Data.json"; // Import the JSON data

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart3 = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [genderData, setGenderData] = useState({ labels: [], datasets: [] });
  const dropdownRefDoughnut = useRef(null); // Define the ref for the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Prepare income distribution data
  useEffect(() => {
    const incomeDistribution = JsonData.monthly_income.income_distribution;
    const labels = incomeDistribution.map((item) => item.range);
    const data = incomeDistribution.map((item) => item.percentage_of_total);

    setIncomeData({
      labels: labels,
      datasets: [
        {
          label: "Income Distribution",
          data: data,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "rgb(134, 37, 15)", // Color 3
            "#121331", // Color 4
            "gray",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const incomeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.monthly_income.total_entries}`;
          },
        },
      },
    },
  };

  // Prepare gender distribution data
  useEffect(() => {
    const labels = JsonData.gender_distribution.map((item) => item.gender);
    const data = JsonData.gender_distribution.map(
      (item) => item.percentage_of_total
    );

    setGenderData({
      labels: labels,
      datasets: [
        {
          label: "Number of Scholarships Disbursed",
          data: data,
          backgroundColor: "#86250f",
          borderWidth: 2,
          borderRadius: 10,
          barThickness: 55,
          hoverBackgroundColor: "#e8461e",
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw}% from the total ${JsonData.total}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Gender",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
          color: "rgba(33, 35, 49, 0.7)",
        },

        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefDoughnut.current &&
        !dropdownRefDoughnut.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Doughnut Chart Section */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
          Income-Based Distribution of People
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {incomeData && <Doughnut data={incomeData} options={incomeOptions} />}
        </div>
      </div>

      {/* Gender Chart Section */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
          Scholarships Given by Gender
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={genderData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataChart3;
