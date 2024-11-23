import React from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import IncomeIssuesJson from "../json/rights/Data.json"; // Import the JSON data
// import { text } from "d3";

// Register chart.js components for Pie, Doughnut, and Bar charts
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const DataChart5 = () => {
  // Abuse Survivor data
  const abuseSurvivorData = IncomeIssuesJson?.abuse_survivor || [];
  const abuseSurvivorPercentage = abuseSurvivorData.map((item) => {
    const survivorCount = item?.survivor_of_abuse;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const chartData = {
    labels: abuseSurvivorData.map((item) => item.salary),
    datasets: [
      {
        label: "Abuse Survivor Percentage (%)",
        data: abuseSurvivorPercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "rgb(101, 25, 11)", // Color 2
        ],
        borderColor: "#2F855A",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#e8461e",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = abuseSurvivorData[index]?.salary;
            const percentage = abuseSurvivorPercentage[index];
            const total = abuseSurvivorData[index]?.total_attended;
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      x: {
        title: {
          display: true,
          text: "Salary",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  // Domestic Violence data
  const domesticViolenceData = IncomeIssuesJson?.domestic_violence || [];
  const domesticViolencePercentage = domesticViolenceData.map((item) => {
    const survivorCount = item?.survivor_of_domestic_violence;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const DomesticChartData = {
    labels: domesticViolenceData.map((item) => item.salary),
    datasets: [
      {
        label: "Domestic Violence Survivor Percentage (%)",
        data: domesticViolencePercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "#121331", // Color 4
        ],
        borderColor: "#e8461e",
        borderWidth: 1,
      },
    ],
  };

  const DomesticOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#e8461e",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = domesticViolenceData[index]?.salary;
            const percentage = domesticViolencePercentage[index];
            const total = domesticViolenceData[index]?.total_attended;
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      x: {
        title: {
          display: true,
          text: "Salary",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Abuse Survivor Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Abuse Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      {/* Domestic Violence Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Domestic Violence Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={DomesticChartData} options={DomesticOptions} />
        </div>
      </div>
    </div>
  );
};

export default DataChart5;
