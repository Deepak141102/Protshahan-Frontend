import React, { useState, useEffect } from 'react';
import { Pie,Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import JsonData from './beat.json'; // Path to your data.json file

const HomeVisitsPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Extract relevant data from JSON
    const homeVisitsData = {
      conducted: JsonData.home_visits.home_visit_conducted_count,
      notConducted: JsonData.home_visits.home_visit_not_conducted_count,
    };

    // Prepare chart data
    setChartData({
      labels: ['Conducted', 'Not Conducted'],
      datasets: [
        {
          label: 'Home Visits',
          data: [homeVisitsData.conducted, homeVisitsData.notConducted],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
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
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,  // Disable the default filter behavior (no legend item click filtering)
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Ensure you're accessing the correct properties
            const totalEntries = JsonData.home_visits.total_entries; // Assuming this is the correct reference
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.home_visits.total_entries}`; // Show percentage in tooltip
          },
        },
      },
      
    },
  };
// income chart 
const [incomeData, setIncomeData] = useState(null);


useEffect(() => {
  // Extract the income distribution data from the JSON
  const incomeDistribution = JsonData.monthly_income.income_distribution;

  // Prepare labels and data for the chart
  const labels = incomeDistribution.map(item => item.range);
  const data = incomeDistribution.map(item => item.percentage_of_total);

  setIncomeData({
    labels: labels,
    datasets: [
      {
        label: 'Income Distribution',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // No Income
          'rgba(54, 162, 235, 0.6)',  // Upto INR 5000
          'rgba(255, 206, 86, 0.6)',  // Upto INR 10000
          'rgba(75, 192, 192, 0.6)',  // Upto INR 15000
          'rgba(153, 102, 255, 0.6)', // More than INR 15000
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
}, []);

const incomeOptions = {
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
      onClick: null

    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}% from the total 177`; // Show percentage in tooltip
        },
      },
    },
  },
};
  return (<>
    <div className="flex justify-center items-center  gap-4 p-3 max-md:flex-col">
    <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
    <h2 className='font-lato text-xs text-[#333] mb-5 text-center'>
      Home Visits Pie Chart
      </h2>
      <div className='w-2/3'>

      {chartData && <Pie data={chartData} options={options} />}
      </div>
    </div>
    <div className="w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-xl rounded-xl">
    <h2 className='font-lato text-xs text-[#333] mb-5 text-center'>
      Monthly Income Doughnut Chart
      </h2>
      <div className='w-2/3'>

      {chartData && <Doughnut data={incomeData} options={incomeOptions} />}
      </div>
    </div>
  </div>
  </>
  );
};

export default HomeVisitsPieChart;
