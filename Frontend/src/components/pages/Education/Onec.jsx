import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const AvailabilityOfElectricityGraph = () => {
  // Electricity availability data
  const electricityData = {
    labels: ['1960', '1980', '2000', '2010', '2015', '2020', '2023'],
    datasets: [
      {
        label: 'India',
        data: [20, 65, 130, 150, 180, 220, 240], // Example data
        borderColor: '#0d6efd',
        backgroundColor: '#0d6efd',
        fill: false,
        tension: 0.3,
        pointBackgroundColor: '#0d6efd',
      },
    ],
  };

  // Electricity graph options
  const electricityOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Kilowatt-hour (kWh)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'kWh per capita',
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h3 className="text-center text-xl font-semibold mb-4">Availability of Electricity (per capita)</h3>
      <div className="flex items-center justify-between mb-4">
        {/* Dropdown for time period */}
        <select className="border rounded px-2 py-1 bg-gray-100">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>

        {/* Country checkbox */}
        <div className="flex items-center">
          <input type="checkbox" checked readOnly className="mr-2" />
          <label>India</label>
        </div>

        {/* CSV download button */}
        <button className="px-3 py-1 rounded bg-gray-200 border border-gray-300">Download CSV</button>
      </div>

      {/* Line chart */}
      <Line data={electricityData} options={electricityOptions} />
    </div>
  );
};

const CashReserveGraph = () => {
  // Cash Reserve data
  const cashReserveData = {
    labels: ['2011', '2013', '2015', '2017', '2020', '2022', '2024'],
    datasets: [
      {
        label: 'India',
        data: [6.0, 4.8, 4.5, 4.0, 5.0, 5.5, 5.8], // Example data
        borderColor: '#17a2b8',
        backgroundColor: '#17a2b8',
        fill: false,
        tension: 0.3,
        pointBackgroundColor: '#17a2b8',
      },
    ],
  };

  // Cash Reserve graph options
  const cashReserveOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Cash Reserve Ratio',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h3 className="text-center text-xl font-semibold mb-4">Cash Reserve Ratio</h3>
      <div className="flex items-center justify-between mb-4">
        {/* Dropdown for time period */}
        <select className="border rounded px-2 py-1 bg-gray-100">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>

        {/* Country checkbox */}
        <div className="flex items-center">
          <input type="checkbox" checked readOnly className="mr-2" />
          <label>India</label>
        </div>

        {/* CSV download button */}
        <button className="px-3 py-1 rounded bg-gray-200 border border-gray-300">Download CSV</button>
      </div>

      {/* Line chart */}
      <Line data={cashReserveData} options={cashReserveOptions} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AvailabilityOfElectricityGraph />
        <CashReserveGraph />
      </div>
    </div>
  );
};

export default Dashboard;
