import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FaGenderless, FaUsers } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import RightsChartsPage from "./DataChart2";
import BarGraph from "./DataChart3";
import IndiaMap from "./IndiaMap";
import CounterSection from "./CounterSection";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Rights = () => {
  const initialData = {
    labels: [
      "Most Vulnerable Communities",
      "Daily Wage Workers",
      "Organised Sector",
    ],
    datasets: [
      {
        label: "Number of Individuals",
        data: [71, 554, 11],
        backgroundColor: [
          "#3c3950", // Darker shade for the first segment
          "#ce441a", // Bright orange for the second segment
          "#919191", // Gray for the third segment
        ],
        borderWidth: 2,
        borderColor: "#fff", // White border for contrast
      },
    ],
  };

  const [filters, setFilters] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedData, setSelectedData] = useState("gender");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
        data: initialData.datasets[0].data.filter(
          (_, index) => filters[initialData.labels[index]]
        ),
        backgroundColor: initialData.datasets[0].backgroundColor.filter(
          (_, index) => filters[initialData.labels[index]]
        ),
      },
    ],
  };

  const DoughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e8461e", // Futuristic color for legends
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  const genderData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [558, 79],
        backgroundColor: [
          "#e8461e", // Bright red for Female
          "#919191", // Gray for Male
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const ageData = {
    labels: ["4-9 Years", "10-19 Years", "20-29 Years"],
    datasets: [
      {
        data: [28, 552, 57],
        backgroundColor: ["#3c3950", "#ce441a", "#919191"], // Colors for age groups
        borderColor: "#fff",
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
          color: "#e8461e",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  const handleIconClick = (dataType) => {
    setSelectedData(dataType);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
      <div className="bg-black bg-opacity-75 text-white py-8 px-12 max-md:px-4">
        <div className="flex flex-col text-4xl max-md:text-2xl mb-4">
          <h1 className="text-center">
            <span className="text-yellow-400">Protsahan</span> - For a Better
            Future | Data Visualization (map 1)
          </h1>
        </div>
        <div className="bg-black py-11 rounded-lg bg-opacity-60">
          <div className="border-2 border-dashed border-white rounded-md p-5 m-5">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex">
                <span className="text-yellow-300">Timeline:</span>
                <p className="ml-2">Child entering Protsahan</p>
              </div>
              <div className="flex flex-col max-md:m-auto">
                <p className="max-sm:text-center">
                  <span className="text-yellow-300">Potential Consumers:</span>{" "}
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4">
              <p>
                This set of data visualizations takes a deeper look into how
                Protsahan is empowering children by providing them with the
                necessary tools to overcome their traumatic experiences and lead
                normal lives.
              </p>
            </div>
          </div>
          <CounterSection />
          {/* Filter for Doughnut Chart */}
          <div className="flex flex-col md:flex-row justify-around items-center">
            {/* Charts Container */}
            <div className="flex flex-col md:flex-row justify-around items-center w-full">
              {/* Doughnut Chart Area */}
              <div className="w-full max-w-xs md:max-w-md">
                <div className="flex flex-col items-center mb-3">
                  <h1 className="text-2xl font-bold mb-5 max-md:text-center">
                    Occupation of the Guardians / Family
                  </h1>
                  <button
                    onClick={toggleDropdown}
                    className="bg-[#212331] text-white px-4 py-2 rounded-md flex items-center"
                  >
                    Toggle Filters
                    <FontAwesomeIcon icon={faFilter} className="ml-2" />
                  </button>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 top-[24.4rem] bg-[#393d50] divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
                    >
                      <ul className="py-2 text-sm text-white">
                        {initialData.labels.map((label) => (
                          <li key={label}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default link behavior
                                toggleFilter(label); // Toggle the filter
                              }}
                              className="block px-4 py-2 hover:bg-[#212331] hover:text-[#e54c29]"
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
                <Doughnut data={filteredData} options={DoughnutOptions} />
              </div>

              {/* Pie Chart Area */}
              <div className="flex flex-col justify-center text-center items-center mt-8 md:mt-0 w-full max-w-xs md:max-w-md py-2">
                <h1 className="text-2xl font-bold mb-6">
                  Scholarship Data Visualization
                </h1>
                <div className="flex space-x-4 mb-4">
                  <div
                    className={`flex items-center cursor-pointer ${
                      selectedData === "gender" ? "text-blue-500" : "text-white"
                    }`}
                    onClick={() => handleIconClick("gender")}
                  >
                    <FaGenderless className="text-3xl mr-2" />
                    <span>Gender</span>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ${
                      selectedData === "age" ? "text-blue-500" : "text-white"
                    }`}
                    onClick={() => handleIconClick("age")}
                  >
                    <FaUsers className="text-3xl mr-2" />
                    <span>Age</span>
                  </div>
                </div>
                {selectedData === "gender" ? (
                  <Pie data={genderData} options={options} />
                ) : (
                  <Pie data={ageData} options={options} />
                )}
              </div>
            </div>
          </div>
          <hr className="my-20" />
          <RightsChartsPage />
          <hr className="my-20" />
          <BarGraph />
          <hr className="my-20" />
          <IndiaMap />
        </div>
      </div>
    </div>
  );
};

export default Rights;
