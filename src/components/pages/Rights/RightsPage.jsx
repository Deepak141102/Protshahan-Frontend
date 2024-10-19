import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { FaGenderless, FaUsers } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
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
        backgroundColor: ["#3c3950", "#ce441a", "#919191"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const [filtersDoughnut, setFiltersDoughnut] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });

  const [dropdownOpenDoughnut, setDropdownOpenDoughnut] = useState(false);
  const [selectedData, setSelectedData] = useState("gender");
  const dropdownRefDoughnut = useRef(null);

  const toggleDropdownDoughnut = () => {
    setDropdownOpenDoughnut((prev) => !prev);
  };

  const toggleFilterDoughnut = (label) => {
    setFiltersDoughnut((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  const filteredDoughnutData = {
    ...initialData,
    labels: initialData.labels.filter((label) => filtersDoughnut[label]),
    datasets: [
      {
        ...initialData.datasets[0],
        data: initialData.datasets[0].data.filter(
          (_, index) => filtersDoughnut[initialData.labels[index]]
        ),
        backgroundColor: initialData.datasets[0].backgroundColor.filter(
          (_, index) => filtersDoughnut[initialData.labels[index]]
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
          color: "#e8461e",
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
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
        backgroundColor: ["#e8461e", "#919191"],
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
        backgroundColor: ["#3c3950", "#ce441a", "#919191"],
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
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpenDoughnut &&
        dropdownRefDoughnut.current &&
        !dropdownRefDoughnut.current.contains(event.target)
      ) {
        setDropdownOpenDoughnut(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenDoughnut]);

  return (
    <div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
    <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">
      <div className="flex text-4xl p-4 ">
        <h1 className="max-md:text-center max-md:text-2xl">
          <span className="text-yellow-400 pl-4">Protsahan</span>
          -For a Better Future | Data Visualization (map 6)
        </h1>
      </div>
      <div className="bg-black py-11 max-p-0 rounded-lg bg-opacity-60">
        <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
          <div className="flex justify-around flex-wrap">
            <div className="flex">
              <span className="text-yellow-300">Timeline:</span>
              <p>Child entering Protsahan</p>
            </div>
            <div className="flex flex-wrap max-md:flex-col max-md:m-auto">
              <p className="max-sm:text-center">
                <span className="text-yellow-300">
                  Potential Consumers:
                </span>
                Protsahan Executive Team | Governmental Bodies
              </p>
            </div>
          </div>
          <div className="text-center p-4">
            <p>
              These set of data visualisations paints a story of the
              enrolment data of students on a specified date range/ month/
              year. It tells the user – how many children have enrolled in
              Protsahan, basic data related to the pool of children etc.
            </p>
          </div>
        </div>       <CounterSection />
          <div className="flex flex-col md:flex-row justify-around items-center">
            {/* Doughnut Chart Area */}
            <div className="w-full max-w-xs md:max-w-md">
              <div className="flex flex-col items-center mb-3">
                <h1 className="text-2xl font-bold mb-5 max-md:text-center">
                  Occupation of the Guardians / Family
                </h1>
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdownDoughnut}
                    className="text-white bg-[#212331] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300 hover:bg-[#e54c29]"
                  >
                    Filter Data <IoChevronDown className="ml-2" />
                  </button>

                  {dropdownOpenDoughnut && (
                    <div
                      ref={dropdownRefDoughnut}
                      className="absolute mt-0 bg-[#393d50] shadow-lg rounded-lg z-10 w-[17rem]"
                    >
                      {Object.keys(filtersDoughnut).map((label) => (
                        <label
                          key={label}
                          htmlFor={`doughnut-checkbox-${label}`}
                          className="block px-4 py-2 hover:bg-[#212331] hover:text-[#e54c29] transition duration-300 cursor-pointer"
                        >
                          <input
                            id={`doughnut-checkbox-${label}`}
                            type="checkbox"
                            checked={filtersDoughnut[label]}
                            onChange={() => toggleFilterDoughnut(label)}
                            className="mr-2"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Doughnut data={filteredDoughnutData} options={DoughnutOptions} />
            </div>

            {/* Pie Chart Area */}
            <div className="flex flex-col justify-center text-center items-center mt-8 md:mt-0 w-full max-w-xs md:max-w-md py-2">
              <h1 className="text-2xl font-bold mb-6">Scholarship Data Visualization</h1>
              <div className="flex space-x-4 mb-4">
                <div
                  className={`flex items-center cursor-pointer ${
                    selectedData === "gender" ? "text-[#e54c29]" : "text-white"
                  }`}
                  onClick={() => handleIconClick("gender")}
                >
                  <FaGenderless className="text-3xl mr-2" />
                  <span>Gender</span>
                </div>
                <div
                  className={`flex items-center cursor-pointer ${
                    selectedData === "age" ? "text-[#e54c29]" : "text-white"
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
