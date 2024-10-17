// src/CombinedPieChart.js
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaGenderless, FaUsers, FaChartPie } from 'react-icons/fa'; // Import icons from react-icons

const CombinedPieChart = () => {
  const [selectedData, setSelectedData] = useState('gender');

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  const genderData = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [558, 79],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Female
          'rgba(255, 99, 132, 0.5)', // Male
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const ageData = {
    labels: ['4-9 Years', '10-19 Years', '20-29 Years'],
    datasets: [
      {
        data: [28, 552, 57],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)', // 4-9 Years
          'rgba(75, 192, 192, 0.5)', // 10-19 Years
          'rgba(153, 102, 255, 0.5)', // 20-29 Years
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  const handleIconClick = (dataType) => {
    setSelectedData(dataType);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Scholarship Data Visualization</h1>
      <div className="mb-4 flex space-x-4">
        <div className="flex items-center cursor-pointer" onClick={() => handleIconClick('gender')}>
          <FaGenderless className={`text-3xl ${selectedData === 'gender' ? 'text-blue-600' : 'text-gray-400'}`} />
          <span className="ml-2 font-medium">Gender</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => handleIconClick('age')}>
          <FaUsers className={`text-3xl ${selectedData === 'age' ? 'text-blue-600' : 'text-gray-400'}`} />
          <span className="ml-2 font-medium">Age</span>
        </div>
      </div>

      <div className="flex flex-col items-center p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {selectedData === 'gender' ? 'Scholarships by Gender' : 'Age Distribution of Recipients'}
        </h2>
        <div className="w-80 md:w-96">
          <Pie data={selectedData === 'gender' ? genderData : ageData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CombinedPieChart;
