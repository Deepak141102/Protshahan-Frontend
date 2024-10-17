import React, { useState, useRef, useEffect } from "react";
import { Pie,Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ScholarshipPieChart from "./Type of Scholarship";

ChartJS.register(ArcElement, Tooltip, Legend);

const Rite = () => {
  const [filters, setFilters] = useState({
    "Upto INR 5,000": true,
    "Upto INR 10,000": true,
    "Upto INR 15,000": true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const data = {
    labels: ["Upto INR 5,000", "Upto INR 10,000", "Upto INR 15,000"],
    datasets: [
      {
        label: "Family Income Distribution",
        data: [420, 206, 9],
        backgroundColor: [
          "#919191",
          "#3c3950",
          "#ce441a",
        ],
        hoverBackgroundColor: [
          "#919191",
          "#3c3950",
          "#ce441a",
        ],
        borderWidth: 3,
        borderColor: "rgba(255, 255, 255, 1)",
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

        dataset.hoverRadius = 15;
        dataset.hoverOffset = 5;
        chart.update();
      } else {
        const dataset = chart.data.datasets[0];
        dataset.hoverRadius = 0;
        dataset.hoverOffset = 0;
        chart.update();
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
    <div className="flex flex-col lg:flex-row justify-center bg-transparent items-center w-full gap-6 lg:gap-12 p-4">
      {/* First Chart (Family Income Distribution) */}
      <div className="flex flex-col items-center w-full lg:w-1/2">
        <h2 className="text-lg lg:text-2xl font-bold mb-4 text-center">
          Monthly Family Income Distribution
        </h2>

        {/* Dropdown Filter */}
        <div className="relative mb-4" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white bg-[#212331] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300 hover:bg-[#e54c29]"
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
            <div className="absolute z-10 bg-[#393d50] divide-y divide-gray-100 rounded-lg shadow-lg w-44">
              <ul className="py-2 text-sm text-white">
                {data.labels.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFilter(label);
                      }}
                      className="block px-4 py-2 hover:bg-[#212331] hover:text-[#e54c29] transition duration-300"
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
        <div className="w-full h-[50vh] lg:h-[70vh]">
          <Pie data={updatedData} options={options} />
        </div>
      </div>

      {/* Second Chart (Scholarships Disbursed by Gender) */}
     

    </div>
  );
};

export default Rite;
