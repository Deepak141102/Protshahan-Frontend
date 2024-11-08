import React, { useState, useEffect } from 'react';
import { Pie,Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import data from './beat.json'; // Path to your data.json file

const HomeVisitsPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Extract relevant data from JSON
    const homeVisitsData = {
      conducted: data.home_visits.home_visit_conducted_count,
      notConducted: data.home_visits.home_visit_not_conducted_count,
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Custom tooltip text
          },
        },
      },
    },
  };
// income chart 
const [incomeData, setIncomeData] = useState(null);

useEffect(() => {
  // Extract relevant data from JSON
  const incomeData = {
    noIncome: data.monthly_income.income_distribution.No_Income,
    upto5000: data.monthly_income.income_distribution.Upto_INR_5000,
    upto10000: data.monthly_income.income_distribution.Upto_INR_10000,
    upto15000: data.monthly_income.income_distribution.Upto_INR_15000,
    moreThan15000: data.monthly_income.income_distribution.More_than_INR_15000,
    others: data.monthly_income.income_distribution.Others.length,
  };

  // Prepare chart data
  setIncomeData({
    labels: ['No Income', 'Upto INR 5000', 'Upto INR 10000', 'Upto INR 15000', 'More than INR 15000', 'Others'],
    datasets: [
      {
        label: 'Income Distribution',
        data: [
          incomeData.noIncome,
          incomeData.upto5000,
          incomeData.upto10000,
          incomeData.upto15000,
          incomeData.moreThan15000,
          incomeData.others,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  });
}, []);
const IncomeOptions = {
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

      {chartData && <Doughnut data={incomeData} options={IncomeOptions} />}
      </div>
    </div>
  </div>
  </>
  );
};

export default HomeVisitsPieChart;
