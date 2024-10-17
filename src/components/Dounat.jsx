import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Dounat = () => {
  const initialData = {
    labels: ["Most Vulnerable Communities", "Daily Wage Workers", "Organised Sector"],
    datasets: [
      {
        label: "Number of Individuals",
        data: [71, 554, 11],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const [filters, setFilters] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleFilter = (label) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  const filteredData = {
    ...initialData,
    labels: initialData.labels.filter((label) => filters[label]),
    datasets: [
      {
        ...initialData.datasets[0],
        data: initialData.datasets[0].data.filter((_, index) =>
          filters[initialData.labels[index]]
        ),
        backgroundColor: initialData.datasets[0].backgroundColor.filter((_, index) =>
          filters[initialData.labels[index]]
        ),
      },
    ],
  };

  const DoughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          Toggle Filters
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
            <ul className="py-2 text-sm text-gray-700">
              {initialData.labels.map((label) => (
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

      {/* Doughnut Chart */}
      <div className="w-full sm:w-1/2 h-[50vh] flex justify-center mt-4">
        <Doughnut data={filteredData} options={DoughnutOptions} />
      </div>
    </div>
  );
};

export default Dounat;
