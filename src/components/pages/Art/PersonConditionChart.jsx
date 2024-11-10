import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import JsonData from "./beat.json"; // Update with the correct path to your JSON file

// Register necessary components for both Line, Doughnut, and Bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PersonConditionsLineChart = () => {
  const [conditionData, setConditionData] = useState(null);
  const [supportRequestData, setSupportRequestData] = useState(null);
  const [ageData, setAgeData] = useState(null);

  useEffect(() => {
    const personConditions = JsonData.person_conditions;
    const conditions = Object.keys(personConditions);
    const counts = Object.values(personConditions);

    // Prepare data for Line Chart
    setConditionData({
      labels: conditions,
      datasets: [
        {
          label: "Person Conditions Count",
          data: counts,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          borderWidth: 2,
        },
      ],
    });


    // Prepare data for Doughnut Chart
   

    const ageGroups = JsonData["Age Groups"];

    // Prepare data for Bar Chart (Age Groups)
    setAgeData({
      labels: Object.keys(ageGroups), // Labels: Age Groups
      datasets: [
        {
          label: "Percentage of Total Population",
          data: Object.values(ageGroups).map((group) => group.Percentage), // Data: Percentages
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const conditionOptions = {
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
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
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
        beginAtZero: true,
      },
    },
  };

  // SUPPORT DATA 

  useEffect(() => {
    // Extract support types and their percentages from the imported data
    const supportTypes = JsonData.support_request.support_types;
    const labels = supportTypes.map(item => item.type);
    const data = supportTypes.map(item => item.percentage_of_total);

    setSupportRequestData({
      labels: labels,
      datasets: [
        {
          label: 'Support Request Distribution',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',  // Direct Bank Transfer
            'rgba(54, 162, 235, 0.6)',  // Digital Device
            'rgba(255, 206, 86, 0.6)',  // Direct Benefit Transfer + Demand Draft
            'rgba(75, 192, 192, 0.6)',  // In Kind Scholarship Support
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
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
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Show percentage in tooltip
          },
        },
      },
    },
  };
  const ageOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total 794`; // Display percentage in tooltip
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis from 0
        ticks: {
          stepSize: 10, // Set the step size to 10 (this will make the axis go 0, 10, 20, etc.)
        },
      },
    },
  };
  

  return (
    <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col">
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
          Person Conditions Line Chart
        </h2>
        {conditionData && <Line data={conditionData} options={conditionOptions} />}
      </div>
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
          Support Request Doughnut Chart
        </h2>
        {supportRequestData && (
          <Doughnut data={supportRequestData} options={supportRequestOptions} />
        )}
      </div>
      <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
        <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
          Age Group Total Counts Bar Chart
        </h2>
        {ageData && <Bar data={ageData} options={ageOptions} />}
      </div>
    </div>
  );
};

export default PersonConditionsLineChart;
