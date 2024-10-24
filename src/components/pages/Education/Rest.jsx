import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  // Chart.js Options for Global Customization
  const options = {
    plugins: {
      legend: {
        display: false, // Remove chart legends if the original design doesn't show them
      },
      tooltip: {
        backgroundColor: '#111827', // Dark background for tooltips
        titleColor: '#FFFFFF', // White text in tooltips
        bodyColor: '#A3A3A3', // Grey text for details
        padding: 12, // Padding for more spacing in tooltips
        titleFont: { weight: 'bold' }, // Bold title text
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`, // Customize tooltip label
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis gridlines
        },
        ticks: {
          color: '#9CA3AF', // Light gray X-axis labels
        },
      },
      y: {
        grid: {
          color: '#E5E7EB', // Very light gray Y-axis gridlines
        },
        ticks: {
          color: '#9CA3AF', // Light gray Y-axis labels
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Order Summary (Line Chart)
  const orderSummaryData = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 3, 5, 2, 3, 16],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF6B35',
        pointHoverRadius: 8,
      },
    ],
  };

  // Revenue Summary (Bar Chart)
  const revenueSummaryData = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1000, 2000, 1500, 3000, 2500, 4000, 3500],
        backgroundColor: '#1A535C',
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 30,
      },
    ],
  };

  // Browser Usage (Doughnut Chart)
  const browserUsageData = {
    labels: ['Chrome', 'Safari', 'Firefox', 'Others'],
    datasets: [
      {
        label: 'Browser Usage',
        data: [40, 30, 20, 10],
        backgroundColor: ['#2f7ed8', '#f39c12', '#c0392b', '#8e44ad'],
        hoverBackgroundColor: ['#1f7a8c', '#e67e22', '#e74c3c', '#9b59b6'],
        cutout: '80%', // Thicker doughnut
      },
    ],
  };

  // Sales Funnel (Line Chart)
  const salesFunnelData = {
    labels: ['Impression', 'Added to Cart', 'Reached Checkout', 'Purchased'],
    datasets: [
      {
        label: 'Sales Funnel',
        data: [12987, 3987, 2850, 1297],
        borderColor: '#8e44ad',
        backgroundColor: 'rgba(142, 68, 173, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8e44ad',
        pointHoverRadius: 8,
      },
    ],
  };

  // Visits by Device (Bar Chart)
  const visitsByDeviceData = {
    labels: ['Mobile', 'Desktop'],
    datasets: [
      {
        label: 'Visits',
        data: [72, 28],
        backgroundColor: ['#8e44ad', '#e74c3c'],
        barThickness: 60,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">$5,675.00</p>
          <p className="text-green-500 font-semibold mt-2">+3.9% vs last week</p>
        </div>
        
        {/* Visits */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visits</h2>
          <p className="text-3xl font-bold">12,987</p>
          <p className="text-green-500 font-semibold mt-2">+8.4% vs last week</p>
        </div>
        
        {/* Average Order Price */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Avg Order Price</h2>
          <p className="text-3xl font-bold">$55.26</p>
          <p className="text-green-500 font-semibold mt-2">+1.9% vs last week</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="relative h-60">
            <Line data={orderSummaryData} options={options} />
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Revenue Summary</h2>
          <div className="relative h-60">
            <Bar data={revenueSummaryData} options={options} />
          </div>
        </div>

        {/* Visits by Device */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visits by Device</h2>
          <div className="relative h-60">
            <Bar data={visitsByDeviceData} options={options} />
          </div>
        </div>

        {/* Browser Usage */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Browser Usage</h2>
          <div className="relative h-60">
            <Doughnut data={browserUsageData} options={options} />
          </div>
        </div>

        {/* Sales Funnel */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Sales Funnel</h2>
          <div className="relative h-60">
            <Line data={salesFunnelData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
