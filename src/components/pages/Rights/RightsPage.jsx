import React, { useState, useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { FaGenderless, FaUsers } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import DataChart2 from "./DoughnutPie";
import DataChart1 from "./LineBar";
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
        hoverBackgroundColor: ["#e8461e", "#df6b4f", "#919191"],
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
        hoverBackgroundColor:
          initialData.datasets[0].hoverBackgroundColor.filter(
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
          color: "#df6b4f",
        },
        onClick: (e) => e.stopPropagation(),
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: "#65190b",
        titleColor: "#fff",
        bodyColor: "#fff",
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
        hoverBackgroundColor: ["#df6b4f", "#ce441a"],
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
        hoverBackgroundColor: ["#e8461e", "#86250f", "#919191"],
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
          color: "#e8461e",
        },
        onClick: (e) => e.stopPropagation(),
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: "#65190b",
        titleColor: "#fff",
        bodyColor: "#fff",
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
      <div className="bg-[#212331] text-white py-8 px-12 max-md:px-0">
        <div className="flex text-4xl p-4">
          <h1 className="text-yellow-400">
            Protsahan - For a Better Future | Data Visualization
          </h1>
        </div>
        <div className="bg-[#3c3950] rounded-lg shadow-lg pt-4">
          <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              <div className="text-white">
                <span className="text-[#e8461e] mr-2">Timeline:</span>
                Child entering Protsahan
              </div>
              <div className="flex flex-wrap justify-center">
                <p className="text-white text-center">
                  <span className="text-[#e8461e] mr-2">
                    Potential Consumers:
                  </span>
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4 text-white">
              <p>
                These set of data visualisations paints a story of the enrolment
                data of students on a specified date range/month/year. It tells
                the user how many children have enrolled in Protsahan, basic
                data related to the pool of children, etc.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <CounterSection />
            <div className="flex justify-center items-center gap-8 py-10 bg-[#dcdcdc]  max-md:flex-col">
              {/* Doughnut Chart */}
              <div className="w-full max-w-[600px] flex flex-col">
                <div className="bg-white h-[81.92vh] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <h2 className="text-2xl font-bold text-center mb-4 text-[#212331]">
                    Occupation of the Guardians / Family
                  </h2>
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
                  <div className="w-full h-[55vh]">
                    <Doughnut
                      data={filteredDoughnutData}
                      options={DoughnutOptions}
                    />
                  </div>
                </div>
              </div>

              {/* Data Chart */}
              <div className="w-full max-w-[600px] flex flex-col">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <h2 className="text-2xl font-bold text-center mb-4 text-[#212331]">
                    Gender Ratio
                  </h2>
                  <div className="w-full h-[55vh]">
                    {selectedData === "gender" ? (
                      <Doughnut data={genderData} options={options} />
                    ) : (
                      <Doughnut data={ageData} options={options} />
                    )}
                  </div>
                  <div className="flex justify-around mt-4">
                    <div className="flex flex-col justify-center items-center">

                    <button
                      onClick={() => handleIconClick("gender")}
                      className={`${
                        selectedData === "gender"
                        ? "bg-[#e8461e]"
                        : "bg-[#919191]"
                      } hover:bg-[#e54c29] p-3 rounded-full text-white transition duration-300`}
                      >
                      <FaGenderless size={25} />
                    
                    </button>
                    <h1 className="text-[#212331]">Gender</h1>
                      </div>
                    <div className="flex flex-col justify-center items-center">

                    <button
                      onClick={() => handleIconClick("age")}
                      className={`${
                        selectedData === "age" ? "bg-[#e8461e]" : "bg-[#919191]"
                      } hover:bg-[#e54c29] p-3 rounded-full text-white transition duration-300`}
                      >
                      <FaUsers size={25} />
                    </button>
                    <h1 className="text-[#212331]">Age</h1>
                      </div>
                  </div>
                </div>
              </div>
            </div>
              <DataChart2/>
              <DataChart1/>
              <IndiaMap/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rights;
