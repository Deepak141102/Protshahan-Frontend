import React, { useState, useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ScholarshipPieChart from "./Type of Scholarship";

ChartJS.register(ArcElement, Tooltip, Legend);

const RightsPage2 = () => {
  const [filters, setFilters] = useState({
    "Upto INR 5,000": true,
    "Upto INR 10,000": true,
    "Upto INR 15,000": true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const data = {
    labels: ["Upto INR 5,000", "Upto INR 10,000", "Upto INR 15,000"],
    datasets: [
      {
        label: "Family Income Distribution",
        data: [420, 206, 9],
        backgroundColor: [
          "#919191", // Gray for first segment
          "#3c3950", // Dark Blue for second segment
          "#ce441a", // Red for third segment
        ],
        hoverBackgroundColor: [
          "#919191", // Gray hover
          "#3c3950", // Dark Blue hover
          "#ce441a", // Red hover
        ],
        borderWidth: 3,
        borderColor: "rgba(255, 255, 255, 1)", // White border for segments
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
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
      mode: "index",
      animationDuration: 400,
    },
    onHover: (event, chartElement) => {
      const chart = event.chart;
      const activeElement = chartElement[0];
      if (activeElement) {
        const index = activeElement.index;
        const dataset = chart.data.datasets[0];

        dataset.hoverRadius = 15; // Increase the size of the hovered segment
        dataset.hoverOffset = 5; // Offset the hovered segment
        chart.update(); // Update the chart
      } else {
        const dataset = chart.data.datasets[0];
        dataset.hoverRadius = 0; // Reset the size
        dataset.hoverOffset = 0; // Reset the offset
        chart.update(); // Update the chart
      }
    },
  };

  const toggleFilter = (label) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  const filteredData = data.datasets[0].data.filter((_, index) =>
    filters[data.labels[index]]
  );

  const visibleLabels = data.labels.filter((label) => filters[label]);
  const visibleBackgroundColors = data.datasets[0].backgroundColor.filter(
    (_, index) => filters[data.labels[index]]
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

  // Scholar chart data
  const ScholarData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [558, 79],
        backgroundColor: [
          "#ce441a", // Bright Red for Female
          "#919191", // Gray for Male
        ],
      },
    ],
  };

  const ScholarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-6 lg:gap-12">
        {/* First Chart (Family Income Distribution) */}
        <div className="w-1/2 flex flex-col items-center max-md:w-full">
          <h2 className="text-lg max-lg:text-2xl font-bold mb-4 text-center">
            Monthly Family Income Distribution
          </h2>

          {/* Dropdown Filter */}
          <div className="relative mb-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white bg-[#212331] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Dropdown button
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 bg-[#393d50] divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-white " >
                  {data.labels.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFilter(label);
                        }}
                        className="block px-4 py-2 hover:bg-[#212331] hover:text-[#e54c29]"
                      >
                        <input
                          type="checkbox"
                          checked={filters[label]}
                          readOnly
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

          {/* Pie Chart */}
          <div className="w-full max-md:w-full h-[50vh] max-md:h-[80vh]">
            <Pie data={updatedData} options={options} />
          </div>
        </div>

        {/* Second Chart (Scholarships Disbursed by Gender) */}
        <div className="w-1/2 max-md:w-full flex flex-col items-center">
          <h2 className="text-lg max-lg:text-2xl font-bold mb-4 text-center">
            Scholarships Disbursed by Gender
          </h2>
          <div className="w-full max-md:w-full h-[50vh] max-md:h-[80vh]">
            <Pie data={ScholarData} options={ScholarOptions} />
          </div>
        </div>
      </div>
      <ScholarshipPieChart />
    </>
  );
};

export default RightsPage2;
