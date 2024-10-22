import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { FaGenderless, FaUsers } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import BarGraph from "./LineBar";
import IndiaMap from "./IndiaMap";

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
        onClick: (e) => e.stopPropagation(),
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
        onClick: (e) => e.stopPropagation(),
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
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-12">
        <div className="flex text-4xl p-4">
          <h1 className="text-yellow-400 pl-4">
            Protsahan - For a Better Future | Data Visualization
          </h1>
        </div>
        <div className="bg-white py-11 rounded-lg shadow-lg">
          <div className="border-[2px] border-dashed border-[#212331] rounded-md p-5 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              <div className="text-black">
                <span className="text-[#e8461e] mr-2">Timeline:</span>
                Child entering Protsahan
              </div>
              <div className="flex flex-wrap justify-center">
                <p className="text-black text-center">
                  <span className="text-[#e8461e] mr-2">
                    Potential Consumers:
                  </span>
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4 text-black">
              <p>
                These set of data visualisations paints a story of the enrolment
                data of students on a specified date range/month/year. It tells
                the user how many children have enrolled in Protsahan, basic
                data related to the pool of children, etc.
              </p>
            </div>
          </div>
          <CounterSection />
          <div className="flex justify-center items-center gap-8 py-10 bg-[#dcdcdc] max-md:flex-col">
            {/* Doughnut Chart */}
            <div className="w-[45%] max-md:w-full flex flex-col">
              {" "}
              {/* Set width to 45% */}
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col flex-grow">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#212331]">
                  Occupation of the Guardians / Family
                </h1>
                <div className="relative mb-5 flex justify-center">
                  <button
                    onClick={toggleDropdownDoughnut}
                    className="bg-[#212331] text-white rounded-lg text-sm px-5 py-2.5 inline-flex items-center transition duration-300 hover:bg-[#e54c29]"
                  >
                    Filter Data <IoChevronDown className="ml-2" />
                  </button>
                  {dropdownOpenDoughnut && (
                    <div
                      ref={dropdownRefDoughnut}
                      className="absolute mt-2 bg-[#393d50] text-white rounded-lg z-10 w-64 shadow-lg"
                    >
                      {Object.keys(filtersDoughnut).map((label) => (
                        <label
                          key={label}
                          htmlFor={`doughnut-checkbox-${label}`}
                          className="block px-4 py-2"
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
                <div className="w-full h-[55vh]">
                  {" "}
                  {/* Increased height */}
                  <Doughnut
                    data={filteredDoughnutData}
                    options={DoughnutOptions}
                  />
                </div>
              </div>
            </div>
            {/* Pie Chart */}
            <div className="w-[45%] max-md:w-full flex flex-col">
              {" "}
              {/* Set width to 45% */}
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col flex-grow">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#212331] ">
                  Gender/Age Distribution
                </h1>
                <div className="flex items-center justify-center mb-5 space-x-4">
                  <div
                    className={`flex items-center cursor-pointer ${
                      selectedData === "gender"
                        ? "text-[#e54c29]"
                        : "text-[#212331]"
                    }`}
                    onClick={() => handleIconClick("gender")}
                  >
                    <FaGenderless className="text-3xl mr-2" />
                    <span>Gender</span>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer ${
                      selectedData === "age"
                        ? "text-[#e54c29]"
                        : "text-[#212331]"
                    }`}
                    onClick={() => handleIconClick("age")}
                  >
                    <FaUsers className="text-3xl mr-2 " />
                    <span>Age</span>
                  </div>
                </div>
                <div className="w-full h-[55vh]">
                  {" "}
                  {/* Increased height */}
                  {selectedData === "gender" ? (
                    <Pie data={genderData} options={options} />
                  ) : (
                    <Pie data={ageData} options={options} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <BarGraph />
          <IndiaMap />
        </div>
      </div>
    </div>
  );
};

export default Rights;
