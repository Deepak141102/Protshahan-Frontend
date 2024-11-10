import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

import data from "./beat.json"; // Path to your data.json file

const ParentProfessionDoughnutChart = () => {
  const [professionData, setProfessionData] = useState(null);

  useEffect(() => {
    // Load and prepare profession data
    const employmentData = data.parent_profession.employment_data;
    const totalCount = data.parent_profession.total_count;

    const flattenedData = employmentData.flatMap((item) => {
      if (item.category === "Organised Sector" && item.details) {
        return item.details.map((detail) => ({
          category: `${item.category} - ${detail.role}`,
          count: detail.count,
        }));
      }
      return { category: item.category, count: item.count };
    });

    // Calculate percentages for each category
    const finalData = flattenedData.map((item) => ({
      category: item.category,
      count: item.count,
      percentage: (item.count / totalCount) * 100, // Calculate percentage
    }));

    // Exclude categories with count less than 5 (no "Others" category)
    const filteredData = finalData.filter((item) => item.count >= 5);

    setProfessionData({
      labels: filteredData.map((item) => item.category),
      datasets: [
        {
          label: "Profession Percentage",
          data: filteredData.map((item) => item.percentage), // Use percentage
          backgroundColor: [
            "rgb(224, 70, 31)", // New color
            "rgb(101, 25, 11)", // New color
            "rgb(134, 37, 15)", // New color
            "rgb(223, 107, 79)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const professionOptions = {
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
        onClick: null, // Disable the default filter behavior (no legend item click filtering)
      },
      tooltip: {
        callbacks: {
          // Custom tooltip that shows percentage
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = professionData.datasets[0].data[index]; // Access percentage
            return `${tooltipItem.dataset.label}: ${percentage.toFixed(
              2
            )}%  from the total [${data.parent_profession.total_count}]`;
          },
        },
      },
    },
  };

  // Rented chart
  const [rentedData, setRentedData] = useState(null);

  useEffect(() => {
    // Assuming data.rented_people is already populated with the data
    const rentedPeopleData = {
      yes: data.rented_people.Yes.percentage, // Using percentage for 'Yes'
      no: data.rented_people.No.percentage, // Using percentage for 'No'
    };

    // Prepare chart data with percentages
    setRentedData({
      labels: ["Rented People"], // Label for the X-axis
      datasets: [
        {
          label: "Yes",
          data: [parseFloat(rentedPeopleData.yes)], // Converting percentage to a number
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
        {
          label: "No",
          data: [parseFloat(rentedPeopleData.no)], // Converting percentage to a number
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []); // Empty dependency array to run only once after the component mounts

  const rentedOptions = {
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
        onClick: null, // Disable the default filter behavior (no legend item click filtering)
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}% from the total [180]`; // Display percentage in tooltip
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Percentage of People",
          color: "#e8461e",
        },
        beginAtZero: true, // Make sure y-axis starts from zero
        ticks: {
          stepSize: 10, // Customize the y-axis step size (e.g., 10, 20, 30, etc.)
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col">
        <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
            Rented People Bar Chart
          </h2>
          {rentedData && <Bar data={rentedData} options={rentedOptions} />}
        </div>

        <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
            Parent Profession Doughnut Chart
          </h2>
          <div className="w-2/3">
            {professionData && (
              <Doughnut data={professionData} options={professionOptions} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentProfessionDoughnutChart;
