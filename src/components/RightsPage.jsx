import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2"; // Importing Pie and Doughnut chart from react-chartjs-2
import "chart.js/auto";
import { FaGenderless, FaUsers } from "react-icons/fa";
import RightsPage2 from "./RightsPage2";

const Rights = () => {
  const [selectedData, setSelectedData] = useState("gender");
  const [filters, setFilters] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const genderData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [558, 79],
        backgroundColor: [
          "#e8461e", // Bright Red for Female
          "#919191", // Gray for Male
        ],
        borderWidth: 2,
      },
    ],
  };

  const ageData = {
    labels: ["4-9 Years", "10-19 Years", "20-29 Years"],
    datasets: [
      {
        data: [28, 552, 57],
        backgroundColor: [
          "#3c3950", // Dark Blue for 4-9 Years
          "#ce441a", // Red for 10-19 Years
          "#919191", // Gray for 20-29 Years
        ],
        borderWidth: 2,
      },
    ],
  };

  const initialData = {
    labels: ["Most Vulnerable Communities", "Daily Wage Workers", "Organised Sector"],
    datasets: [
      {
        label: "Number of Individuals",
        data: [71, 554, 11],
        backgroundColor: [
          "#919191", // Gray for Most Vulnerable Communities
          "#3c3950", // Dark Blue for Daily Wage Workers
          "#ce441a", // Red for Organised Sector
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: 'white', // Legend text color
        },
      },
    },
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleFilter = (label) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  // Effect to close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the dropdown is open and the click is outside of it
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]); // Re-run effect if dropdownOpen state changes

  return (
    <div className="bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0">
      <div className="flex justify-evenly flex-wrap">
        <div className="flex flex-wrap justify-around w-full max-md:flex-col mb-20">
          {/* Pie Chart */}
          <div className="w-1/3 h-[50vh] max-md:w-full mb-4 max-md:h-[80vh]">
            <h1 className="text-2xl font-bold text-center">
              Scholarship Data Visualization
            </h1>
            <div className="flex mb-4 justify-center space-x-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setSelectedData("gender")}
              >
                <FaGenderless
                  className={`text-3xl ${selectedData === "gender" ? "text-blue-600" : "text-gray-400"}`}
                />
                <span className="ml-2">Gender</span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setSelectedData("age")}
              >
                <FaUsers
                  className={`text-3xl ${selectedData === "age" ? "text-blue-600" : "text-gray-400"}`}
                />
                <span className="ml-2">Age</span>
              </div>
            </div>
            <h2 className="text-xl max-max-sm:text-2xl font-bold mb-4 text-center">
              {selectedData === "gender" ? "Scholarships by Gender" : "Age Distribution of Recipients"}
            </h2>
            <Pie data={selectedData === "gender" ? genderData : ageData} options={options} />
          </div>

          {/* Doughnut Chart */}
          <div className="w-1/3 mb-4 flex justify-center items-center flex-col max-md:w-full max-md:h-[80vh]">
            {/* Dropdown Menu */}
            <div className="flex flex-col w-full mb-4 justify-center items-center">
              <button
                onClick={toggleDropdown}
                className="bg-[#212331] text-white px-4 py-2 rounded-md flex items-center"
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
                <div ref={dropdownRef} className="absolute z-10 top-[72px] bg-[#393d50] divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-max-sm text-white">
                    {initialData.labels.map((label) => (
                      <li key={label}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent the default link behavior
                            toggleFilter(label); // Toggle the filter
                          }}
                          className="px-4 py-2 hover:bg-[#212331] flex items-center hover:text-[#e54c29]"
                        >
                          <input
                            type="checkbox"
                            checked={filters[label]}
                            readOnly // Make checkbox read-only as we are handling its state in the dropdown
                            className="mr-2 no-cursor" // Apply the new class here
                          />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <h2 className="text-xl max-sm:text-2xl font-bold mb-4 text-center">Individuals by Community Type</h2>
            <Doughnut data={filteredData} options={options} />
          </div>
        </div>
      </div>
      <RightsPage2 />
    </div>
  );
};

export default Rights;
