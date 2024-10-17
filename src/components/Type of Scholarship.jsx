// src/ScholarshipPieChart.js
import React, { useState, useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // Import filter icon
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import chevron down icon

const ScholarshipPieChart = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    'Direct Bank Transfer': true,
    'Digital Device': true,
    'DBT + DD': true,
  });
  
  const dropdownRef = useRef(null);

  // Data for scholarship types
  const scholarshipData = {
    All: [603, 29, 5],
    'Direct Bank Transfer': [603, 0, 0],
    'Digital Device': [0, 29, 0],
    'DBT + DD': [0, 0, 5],
  };

  // Determine labels and data based on selected filters
  const labels = Object.keys(filters).filter(label => filters[label]);
  const dataValues = labels.length === 0 ? [0, 0, 0] : labels.map(label => scholarshipData[label]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Scholarship Types',
        data: dataValues.flat(),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle individual filter checkbox and dropdown
  const toggleFilter = (filter) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center m-auto ">
      <h2 className="text-2xl font-bold mb-4">Type of Scholarship</h2>

      {/* Filter Dropdown */}
      <div className="relative mb-4">
        <button 
          onClick={toggleDropdown} 
          className="flex items-center bg-[#212331] p-2 rounded shadow transition duration-200 ease-in-out focus:outline-none"
        >
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          <span className="font-semibold">Toggle Filters</span>
          <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
        </button>

        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute z-10 mt-1 bg-[#393d50]  rounded shadow-lg transition-all duration-200 ease-in-out">
            <ul className="py-2 text-sm text-white ">
              {Object.keys(filters).map((filter) => (
                <li 
                  key={filter} 
                  className="px-4 py-2 hover:text-[#e54c29] hover:bg-[#212331] flex items-center cursor-pointer "
                  onClick={() => toggleFilter(filter)} // Toggle filter on text click
                >
                  <input
                    type="checkbox"
                    checked={filters[filter]}
                    readOnly // Make checkbox read-only since we're handling state in the list item click
                    className="mr-2"
                  />
                  <span>{filter}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-2/5 max-md:w-full  max-md:h-[80vh]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ScholarshipPieChart;
