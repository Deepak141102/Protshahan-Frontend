import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

import data from './beat.json'; // Path to your data.json file

const ParentProfessionDoughnutChart = () => {
  const [professionData, setProfessionData] = useState(null);

  useEffect(() => {
    // Load and prepare profession data
    const employmentData = data.parent_profession.employment_data;

    const flattenedData = employmentData.flatMap(item => {
      if (item.category === 'Organised Sector' && item.details) {
        return item.details.map(detail => ({
          category: `${item.category} - ${detail.role}`,
          count: detail.count,
        }));
      }
      return { category: item.category, count: item.count };
    });

    const othersCategory = flattenedData.filter(item => item.count < 5);
    const filteredData = flattenedData.filter(item => item.count >= 5);
    const groupedOthers = {
      category: 'Others',
      count: othersCategory.reduce((sum, item) => sum + item.count, 0),
    };

    const finalData = [...filteredData, groupedOthers];

    setProfessionData({
      labels: finalData.map(item => item.category),
      datasets: [
        {
          label: 'Profession Count',
          data: finalData.map(item => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(200, 200, 200, 0.6)', // Color for 'Others'
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const professionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,  // Disable the default filter behavior (no legend item click filtering)
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Custom tooltip text
          },
        },
      },
    },
    scales: {
     

    },
  };

  // Rented chart
  const [rentedData, setRentedData] = useState(null);

  useEffect(() => {
    // Extract relevant data from the JSON
    const rentedPeopleData = {
      yes: data.rented_people.Yes,
      no: data.rented_people.No,
    };

    // Prepare chart data
    setRentedData({
      labels: ['Rented People'], // Label for the X-axis
      datasets: [
        {
          label: 'Yes',
          data: [rentedPeopleData.yes],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'No',
          data: [rentedPeopleData.no],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const rentedOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,  // Disable the default filter behavior (no legend item click filtering)
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Custom tooltip text
          },
        },
      },
    },
    scales: {
     
      y: {
        title: {
          display: true,
          text: 'Count of people',
          color:"#e8461e"
        },
        beginAtZero: true, // Make sure y-axis starts from zero
      },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col">
        <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className='font-lato text-xs text-[#333] mb-5 text-center'>
            Rented People Bar Chart
          </h2>
          {rentedData && <Bar data={rentedData} options={rentedOptions} />}
        </div>

        <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
          <h2 className='font-lato text-xs text-[#333] mb-5 text-center'>
            Parent Profession Doughnut Chart
          </h2>
          <div className='w-2/3'>
            {professionData && <Doughnut data={professionData}  options={professionOptions}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentProfessionDoughnutChart;
