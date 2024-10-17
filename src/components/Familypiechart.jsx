// src/PieChart.js
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [filters, setFilters] = useState({
    "Upto INR 5,000": true,
    "Upto INR 10,000": true,
    "Upto INR 15,000": true,
  });
  
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const data = {
    labels: ["Upto INR 5,000", "Upto INR 10,000", "Upto INR 15,000"],
    datasets: [
      {
        label: "Family Income Distribution",
        data: [420, 206, 9],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 3,
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    elements: {
      arc: {
        borderWidth: 3,
      },
    },
    hover: {
      mode: 'index',
      animationDuration: 400,
    },
    onHover: (event, chartElement) => {
      const chart = event.chart;
      const activeElement = chartElement[0];
      if (activeElement) {
        const index = activeElement.index;
        const dataset = chart.data.datasets[0];

        dataset.hoverRadius = 15; // Increase the size of the hovered segment
        dataset.hoverOffset = 10; // Offset the hovered segment
        chart.update(); // Update the chart
      } else {
        const dataset = chart.data.datasets[0];
        dataset.hoverRadius = 0; // Reset the size
        dataset.hoverOffset = 0; // Reset the offset
        chart.update(); // Update the chart
      }
    },
  };

  // Function to toggle visibility
  const toggleFilter = (label) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  // Filter data based on selected filters
  const filteredData = data.datasets[0].data.filter((_, index) =>
    filters[data.labels[index]]
  );

  // Update labels and background colors based on visibility
  const visibleLabels = data.labels.filter((label) => filters[label]);
  const visibleBackgroundColors = data.datasets[0].backgroundColor.filter((_, index) =>
    filters[data.labels[index]]
  );

  const updatedData = {
    ...data,
    labels: visibleLabels,
    datasets: [
      {
        ...data.datasets[0],
        data: filteredData,
        backgroundColor: visibleBackgroundColors,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md shadow-2xl rounded-lg bg-white p-6 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-4">
          Monthly Family Income Distribution
        </h2>
        
        {/* Dropdown Filter Button */}
        <div className="relative mb-4 ">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Dropdown button 
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                {data.labels.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default link behavior
                        toggleFilter(label); // Toggle the filter
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={filters[label]}
                        readOnly // Make checkbox read-only as we are handling its state in the dropdown
                        className="mr-2"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Pie data={updatedData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
