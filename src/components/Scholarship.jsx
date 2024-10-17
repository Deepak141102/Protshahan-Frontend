// src/ScholarshipPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const ScholarshipPieChart = () => {
  const data = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [558, 79],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Female color
          'rgba(255, 99, 132, 0.5)', // Male color
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Scholarships Disbursed by Gender</h2>
      <div className="w-80 md:w-96">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ScholarshipPieChart;
