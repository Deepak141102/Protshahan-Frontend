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
import communityJsonData from "../json/beat.json"; // Renamed imported data to avoid conflict

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EduChart = () => {
  const firstGenerationLearners =
  communityJsonData?.First_Generation_Learner || [];
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
        backgroundColor: [
          "rgb(224, 70, 31)",
          "rgb(101, 25, 11)",
          "rgb(134, 37, 15)",
        ],
        borderColor: "#2D3748",
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
        color: "#2D3748",
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = firstGenerationLearners[index]?.Salary;
            const total = firstGenerationLearners[index]?.total_attended;
            const percentage = firstGenPercentage[index];
            return `${salary}: ${percentage}% (${total} responses) from the total 87`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Salary", // x-axis label
          color: "#e8461e", // color of the label
          font: {
            size: 14, // size of the label text
          },
        },
        ticks: {
          color: "#2D3748",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage (%)", // y-axis label
          color: "#e8461e", // color of the label
          font: {
            size: 14, // size of the label text
          },
        },
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
    const applicantsData =
      communityJsonData?.community_or_gec?.applicants || [];
    setCommunityChartData({
      labels: applicantsData.map((item) => item.type),
      datasets: [
        {
          label: "Applicants Count",
          data: applicantsData.map((item) => item.percentage_of_total),
          backgroundColor: ["rgb(224, 70, 31)", "rgb(101, 25, 11)"],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const CommunityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: "#e8461e",
        font: {
          size: 14,
        },
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
    scales: {
      x: {
        title: {
          display: true,
          text: "Applicant Type", // x-axis label
          color: "#e8461e", // color of the label
          font: {
            size: 14, // size of the label text
          },
        },
        ticks: {
          color: "#2D3748",
        },
      },
      y: {
        title: {
          display: true,
          text: "Applicants Percentage (%)", // y-axis label
          color: "#e8461e", // color of the label
          font: {
            size: 14, // size of the label text
          },
        },
        ticks: {
          color: "#2D3748",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="flex  justify-center items-center gap-6  bg-[#dcdcdc]  max-md:flex-col">
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-lg font-semibold text-[#121331] mb-5 text-center">
            First-Generation Learners: Salary Analysis Overview{" "}
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            <Bar data={chartData} options={options} />
          </div>
        </div>
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-lg font-semibold text-[#121331] mb-5 text-center">
            Community or GEC Bar Chart
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            {communityChartData && (
              <Bar data={communityChartData} options={CommunityOptions} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EduChart;
