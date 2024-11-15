import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import JsonData from '../Art/beat.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeVisitsPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const homeVisitsData = {
      conducted: JsonData.home_visits.home_visit_conducted_count,
      notConducted: JsonData.home_visits.home_visit_not_conducted_count,
    };
    setChartData({
      labels: ['Conducted', 'Not Conducted'],
      datasets: [
        {
          label: 'Home Visits',
          data: [homeVisitsData.conducted, homeVisitsData.notConducted],
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
        },
      ],
    });
// fmd
    const membersDistribution = JsonData.family_members.members_distribution;
    const labels = membersDistribution.map((item) => item.range);
    const data = membersDistribution.map((item) => item.percentage_of_total);
    setMemberData({
      labels,
      datasets: [
        {
          label: "Family Members",
          data,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "rgb(134, 37, 15)", // Color 3
            "#121331", // Color 4
            "gray"
          ],
          borderColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "gray",
            "#121331", // Color 4
            "rgb(134, 37, 15)", // Color 3
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 10, // Reduced padding
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const totalEntries = JsonData.home_visits.total_entries;
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${totalEntries}`;
          },
        },
      },
    },
  };

  const memberOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.family_members.total_entries}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Family Members Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage of Total (%)",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      {/* Home Visits Pie Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="font-lato text-xs text-[#333] mb-3 text-center">
          Home Visits Pie Chart
        </h2>
          {chartData && <Pie data={chartData} options={options} />}
      </div>

      {/* Family Members Bar Chart */}
      <div className="w-full md:w-1/2 h-[75vh] max-md:h-[50vh] bg-white p-3 flex justify-center items-center flex-col shadow-md rounded-lg">
      <h2 className="font-lato text-xs text-[#333] mb-3 text-center">
          Family Members Distribution
        </h2>
          {memberData && <Bar data={memberData} options={memberOptions} />}
      </div>
    </div>
  );
};

export default HomeVisitsPieChart;
