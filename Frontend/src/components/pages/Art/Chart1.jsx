import React, { useState, useEffect } from "react";
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
import JsonData from "./beat.json"; 

const FamilyMembersChart = () => {
  // Extract the family members data from the imported JSON file
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    // Corrected reference to data object
    const membersDistribution = JsonData.family_members.members_distribution;

    // Prepare the chart data
    const labels = membersDistribution.map((item) => item.range); // Keep dynamic data for ranges
    const chartData = membersDistribution.map((item) => item.percentage_of_total);

    setMemberData({
      labels: labels, // Dynamically generated from the JSON data
      datasets: [
        {
          label: "Member", // Static label for the bar chart
          data: chartData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const memberOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.family_members.total_entries} `;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Family Members Range", // Label for the X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage of Total (%)", // Label for the Y-axis
        },
        beginAtZero: true,
        max: 100, // Since percentages are used, max y-axis is 100
      },
    },
  };

  // State for Doughnut chart
  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    const applicantsData = JsonData.community_or_gec.applicants;

    // Prepare chart data for Doughnut chart
    setCommunityData({
      labels: applicantsData.map((item) => item.type),
      datasets: [
        {
          label: "Applicants Count",
          data: applicantsData.map((item) => item.percentage_of_total),
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
      },
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.raw}% Applicants from the total ${JsonData.community_or_gec.total_applicants}`;
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
        {communityData && <Bar data={communityData} options={CommunityOptions} />}
      </div>

      {/* Family Members Distribution Bar Chart */}
      <div className="bg-white p-5">
        <h2 className="font-lato text-xs text-[#333] mb-5">Family Members Distribution</h2>
        {memberData && <Bar data={memberData} options={memberOptions} />}
      </div>
    </div>
  );
};

export default FamilyMembersChart;
