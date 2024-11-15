import React from 'react';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js';
import IncomeIssuesJson from '../Technology/Issues.json'; // Import the JSON data

// Register chart.js components for Pie, Doughnut, and Bar charts
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

const ServiverChart = () => {
  // Abuse Survivor data
  const abuseSurvivorData = IncomeIssuesJson?.["Abuse Survivor"] || [];
  const abuseSurvivorPercentage = abuseSurvivorData.map(item => {
    const survivorCount = item?.["Survivor of abuse"];
    const totalAttended = item?.["total_attended"];
    return survivorCount && totalAttended ? ((survivorCount / totalAttended) * 100).toFixed(2) : "0";
  });

  const chartData = {
    labels: abuseSurvivorData.map(item => item.Salary),
    datasets: [
      {
        label: 'Abuse Survivor Percentage (%)',
        data: abuseSurvivorPercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "rgb(101, 25, 11)", // Color 2
        ],
        borderColor: '#2F855A',
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
        text: 'Abuse Survivor Percentage by Salary',
        color: '#2D3748',
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = abuseSurvivorData[index]?.Salary;
            const percentage = abuseSurvivorPercentage[index];
            const total = abuseSurvivorData[index]?.total_attended;
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
      },
    },
  };

  // Domestic Violence data
  const domesticViolenceData = IncomeIssuesJson?.domestic_violence || [];
  const domesticViolencePercentage = domesticViolenceData.map(item => {
    const survivorCount = item?.["Survivor of domestic violence"];
    const totalAttended = item?.["total_attended"];
    return survivorCount && totalAttended ? ((survivorCount / totalAttended) * 100).toFixed(2) : "0";
  });

  const DomesticChartData = {
    labels: domesticViolenceData.map(item => item.Salary),
    datasets: [
      {
        label: 'Domestic Violence Survivor Percentage (%)',
        data: domesticViolencePercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "#121331", // Color 4
        ],
        borderColor: '#2B6CB0',
        borderWidth: 1,
      },
    ],
  };

  const DomesticOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },      title: {
        display: true,
        text: 'Domestic Violence Survivor Percentage by Salary',
        color: '#2D3748',
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = domesticViolenceData[index]?.Salary;
            const percentage = domesticViolencePercentage[index];
            const total = domesticViolenceData[index]?.total_attended;
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
      },
    },
  };

  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      
      {/* Abuse Survivor Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">Salary Analysis - Abuse Survivor Percentage (Bar)</h2>
        <Bar data={chartData} options={options} />
      </div>

      {/* Domestic Violence Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">Salary Analysis - Domestic Violence Survivor Percentage (Bar)</h2>
        <Bar data={DomesticChartData} options={DomesticOptions} />
      </div>
    </div>
  );
};

export default ServiverChart;
