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

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Importing JSON data directly
import data from "./beat.json"; // Path to your data.json file

const FamilyMembersChart = () => {
  // Extract the family members data from the imported JSON file
  const familyMembers = data.family_members;

  // Prepare chart data for Family Members Distribution
  const chartData = {
    labels: Object.keys(familyMembers), // Extracting the family categories as labels (x-axis)
    datasets: [
      {
        label: "Number of Families", // Dataset label
        data: Object.values(familyMembers), // The count of families in each category
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Chart options for Family Members
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Family Members Distribution",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: (e) => e.stopPropagation(), // Chart title
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} Families`; // Tooltip displaying the count of families
          },
        },
      },
    },
  };

  // State for Doughnut chart
  const [DoughnutData, setChartData] = useState(null);

  useEffect(() => {
    const applicantsData = data.community_or_gec.applicants;

    // Prepare chart data for Doughnut chart
    setChartData({
      labels: applicantsData.map((item) => item.type),
      datasets: [
        {
          label: "Applicants Count",
          data: applicantsData.map((item) => item.count),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
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
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: (e) => e.stopPropagation(), // Chart title
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} Applicants`; // Tooltip displaying the count of applicants
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
      {/* Community or GEC Bar Chart */}
      <div className="bg-white p-5">
        <h2 className="font-lato text-xs text-[#333] mb-5">Community or GEC Bar Chart</h2>
        {DoughnutData && <Bar data={DoughnutData} options={CommunityOptions} />}
      </div>

      {/* Family Members Distribution Bar Chart */}
      <div className="bg-white p-5">
        <h2 className="font-lato text-xs text-[#333] mb-5">Family Members Distribution</h2>
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default FamilyMembersChart;
