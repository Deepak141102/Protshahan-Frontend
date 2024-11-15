import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

import data from "../Art/beat.json"; // Path to your data.json file
import IncomeIssuesJson from "../Technology/Issues.json"; // Replace with the correct path

const LostChart = () => {
  // Rented chart
  const [rentedData, setRentedData] = useState(null);

  useEffect(() => {
    if (data?.rented_people) {
      const rentedPeopleData = {
        yes: data.rented_people.Yes.percentage || 0,
        no: data.rented_people.No.percentage || 0,
      };

      setRentedData({
        labels: ["Rented People"],
        datasets: [
          {
            label: "Yes",
            data: [parseFloat(rentedPeopleData.yes)],
            backgroundColor:"rgb(224, 70, 31)", // Color 1
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
          {
            label: "No",
            data: [parseFloat(rentedPeopleData.no)],
            backgroundColor: "rgb(134, 37, 15)", // Color 3
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      });
    }
  }, []);

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
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}% from the total [180]`;
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
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  // Lost Parent Chart
  const lostParentData = IncomeIssuesJson?.Has_Lost_Parent || [];
  const lostParentPercentage = lostParentData.map((item) => {
    const lostParentCount = item?.Has_Lost_A_Parent || 0;
    const totalAttended = item?.total_attended || 1;
    return ((lostParentCount / totalAttended) * 100).toFixed(2);
  });

  const lostParentChartData = {
    labels: lostParentData.map((item) => item.Salary || "Unknown"),
    datasets: [
      {
        label: "Lost A Parent Percentage (%)",
        data: lostParentPercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "rgb(101, 25, 11)", // Color 2
        ],
        borderWidth: 1,
      },
    ],
  };

  const lostParentOptions = {
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
      },
      title: {
        display: true,
        text: "Percentage of People Who Have Lost A Parent by Salary",
        color: "#2D3748",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = lostParentData[index]?.Salary || "Unknown";
            const total = lostParentData[index]?.total_attended || 0;
            const percentage = lostParentPercentage[index];
            return `${salary}: ${percentage}% (${total} responses)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col bg-[#dcdcdc]">
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
          Rented People Bar Chart
        </h2>
        {rentedData ? (
          <Bar data={rentedData} options={rentedOptions} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Salary Analysis - Lost A Parent Percentage
        </h2>
        {lostParentData.length ? (
          <Doughnut data={lostParentChartData} options={lostParentOptions} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default LostChart;
