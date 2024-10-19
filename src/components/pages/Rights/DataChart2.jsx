import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IoChevronDown } from "react-icons/io5"; // Import the down arrow icon

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart2 = () => {
  // RightsPage2 (Pie Chart) Data and Functionalities
  const [filtersPie, setFiltersPie] = useState({
    "Upto INR 5,000": true,
    "Upto INR 10,000": true,
    "Upto INR 15,000": true,
  });

  const [dropdownOpenPie, setDropdownOpenPie] = useState(false);
  const dropdownRefPie = useRef(null);

  const dataPie = {
    labels: ["Upto INR 5,000", "Upto INR 10,000", "Upto INR 15,000"],
    datasets: [
      {
        label: "Family Income Distribution",
        data: [420, 206, 9],
        backgroundColor: ["#919191", "#3c3950", "#ce441a"],
        hoverBackgroundColor: ["#919191", "#3c3950", "#ce441a"],
        borderWidth: 3,
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",  // Center the legend horizontally
        labels: {
          boxWidth: 15,  // Adjust the size of the legend box
          padding: 20,   // Add padding between the text and box
          usePointStyle: true,  // Make the legend point circular
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  const filteredDataPie = dataPie.datasets[0].data.filter((_, index) =>
    filtersPie[dataPie.labels[index]]
  );
  const visibleLabelsPie = dataPie.labels.filter((label) => filtersPie[label]);
  const visibleBackgroundColorsPie = dataPie.datasets[0].backgroundColor.filter(
    (_, index) => filtersPie[dataPie.labels[index]]
  );

  const updatedDataPie = {
    ...dataPie,
    labels: visibleLabelsPie,
    datasets: [
      {
        ...dataPie.datasets[0],
        data: filteredDataPie,
        backgroundColor: visibleBackgroundColorsPie,
      },
    ],
  };

  const toggleDropdownPie = () => {
    setDropdownOpenPie(!dropdownOpenPie);
  };

  const toggleFilterPie = (label) => {
    setFiltersPie((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  // DoughnutChart Data and Functionalities
  const [filtersDoughnut, setFiltersDoughnut] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });

  const [dropdownOpenDoughnut, setDropdownOpenDoughnut] = useState(false);
  const dropdownRefDoughnut = useRef(null);

  const initialDataDoughnut = {
    labels: ["Most Vulnerable Communities", "Daily Wage Workers", "Organised Sector"],
    datasets: [
      {
        label: "Number of Individuals",
        data: [71, 554, 11],
        backgroundColor: [ "#65190b", "#ce441a","#919191",],
        borderWidth: 2,
      },
    ],
  };

  const optionsDoughnut = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "center",  // Center the legend horizontally
        labels: {
          boxWidth: 15,  // Adjust the size of the legend box
          padding: 20,   // Add padding between the text and box
          usePointStyle: true,  // Make the legend point circular
        },
      },
    },
  };

  const filteredDataDoughnut = {
    ...initialDataDoughnut,
    labels: initialDataDoughnut.labels.filter((label) => filtersDoughnut[label]),
    datasets: [
      {
        ...initialDataDoughnut.datasets[0],
        data: initialDataDoughnut.datasets[0].data.filter((_, index) =>
          filtersDoughnut[initialDataDoughnut.labels[index]]
        ),
        backgroundColor: initialDataDoughnut.datasets[0].backgroundColor.filter((_, index) =>
          filtersDoughnut[initialDataDoughnut.labels[index]]
        ),
      },
    ],
  };

  const toggleDropdownDoughnut = () => {
    setDropdownOpenDoughnut(!dropdownOpenDoughnut);
  };

  const toggleFilterDoughnut = (label) => {
    setFiltersDoughnut((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownOpenPie && dropdownRefPie.current && !dropdownRefPie.current.contains(event.target)) ||
        (dropdownOpenDoughnut && dropdownRefDoughnut.current && !dropdownRefDoughnut.current.contains(event.target))
      ) {
        setDropdownOpenPie(false);
        setDropdownOpenDoughnut(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenPie, dropdownOpenDoughnut]);

  return (
    <div className="flex max-md:flex-col justify-evenly items-center bg-transparent w-full gap-6 p-4 mt-11">
      {/* Pie Chart with Filters */}
      <div className="flex flex-col items-center w-1/3 max-md:w-full">
        <h2 className="text-lg lg:text-2xl font-bold mb-4 text-center">
          Monthly Family Income Distribution
        </h2>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdownPie}
            className="mb-4 bg-[#212331] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#e54c29]"
          >
            Filter Data <IoChevronDown className="ml-2" /> {/* Add the down arrow icon */}
          </button>
          {dropdownOpenPie && (
            <div ref={dropdownRefPie} className="absolute -mt-[14px] bg-[#393d50] shadow-lg rounded-lg w-[15rem] z-10">
              {Object.keys(filtersPie).map((label) => (
                <label
                  key={label}
                  htmlFor={`pie-checkbox-${label}`}
                  className="block px-4 py-2 hover:bg-[#212331] cursor-pointer hover:text-[#e54c29] transition duration-300 "
                >
                  <input
                    id={`pie-checkbox-${label}`}
                    type="checkbox"
                    checked={filtersPie[label]}
                    onChange={() => toggleFilterPie(label)}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="w-full h-[60vh] max-md:h-[55vh] ">
          <Pie data={updatedDataPie} options={optionsPie} />
        </div>
      </div>

      {/* Doughnut Chart with Filters */}
      <div className="flex flex-col items-center w-2/5 max-md:w-full">
        <h2 className="text-lg lg:text-2xl font-bold mb-4 text-center">
          Individuals by Community Type
        </h2>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdownDoughnut}
            className="text-white bg-[#212331] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300 hover:bg-[#e54c29]"
          >
            Filter Data <IoChevronDown className="ml-2" /> {/* Add the down arrow icon */}
          </button>
          {dropdownOpenDoughnut && (
            <div ref={dropdownRefDoughnut} className="absolute mt-0 bg-[#393d50] shadow-lg rounded-lg z-10 w-[17rem]">
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
        <div className="w-full h-[60vh] max-md:w-screen max-md:h-[55vh] flex justify-center items-center">
          <Doughnut data={filteredDataDoughnut} options={optionsDoughnut} />
          
          
        </div>
      </div>
    </div>
  );
};

export default DataChart2;
