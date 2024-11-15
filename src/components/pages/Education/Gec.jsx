import { React, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IncomeIssuesJson from "../Technology/Issues.json"; // Import the JSON data
import JsonData from "../Technology/Inocme.json"; // Import the JSON data
import communityJsonData from "../Art/beat.json"; // Renamed imported data to avoid conflict

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IssuesChart = () => {
  const firstGenerationLearners = IncomeIssuesJson?.First_Generation_Learner || [];
  const totalRespondents = firstGenerationLearners[3]?.total_attended || 0;

  const firstGenPercentage = firstGenerationLearners.map((item) => {
    const firstGenLearner = item?.["First_Generation_Learner"];
    const totalAttended = item?.["total_attended"];
    if (firstGenLearner && totalAttended) {
      return ((firstGenLearner / totalAttended) * 100).toFixed(2);
    }
    return "0";
  });

  const chartData = {
    labels: firstGenerationLearners.map((item) => item.Salary),
    datasets: [
      {
        label: "First Generation Learner Percentage (%)",
        data: firstGenPercentage,
        backgroundColor: "#4A5568",
        borderColor: "#2D3748",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Percentage of First Generation Learners by Salary",
        color: "#2D3748",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = firstGenerationLearners[index]?.Salary;
            const total = firstGenerationLearners[index]?.total_attended;
            const percentage = firstGenPercentage[index];
            return `${salary}: ${percentage}% (${total} responses) from the total ${totalRespondents}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2D3748",
        },
      },
      y: {
        ticks: {
          color: "#2D3748",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const [communityChartData, setCommunityChartData] = useState(null); // Renamed state

  useEffect(() => {
    const applicantsData = communityJsonData?.community_or_gec?.applicants || [];
    setCommunityChartData({
      labels: applicantsData.map((item) => item.type),
      datasets: [
        {
          label: "Applicants Count",
          data: applicantsData.map((item) => item.percentage_of_total),
          backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)"],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const CommunityOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Community or GEC Applicants",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.raw}% Applicants from the total ${
              communityJsonData?.community_or_gec?.total_applicants || "N/A"
            }`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col">
        <div className="w-1/2  max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
            Salary Analysis - First Generation Learner Percentage
          </h2>
          <Bar data={chartData} options={options} />
        </div>
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className="font-lato text-xs text-[#333] mb-5 text-center">
            Community or GEC Bar Chart
          </h2>
          {communityChartData && <Bar data={communityChartData} options={CommunityOptions} />}
        </div>
      </div>
    </>
  );
};

export default IssuesChart;
