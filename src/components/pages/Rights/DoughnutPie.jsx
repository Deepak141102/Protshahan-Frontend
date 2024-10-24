import React, { useState, useRef, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { IoChevronDown } from "react-icons/io5";
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart2 = () => {
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
        hoverBackgroundColor: ["#e8461e", "#df6b4f", "#86250f"],
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
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

  const [filtersDoughnut, setFiltersDoughnut] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });
  const [dropdownOpenDoughnut, setDropdownOpenDoughnut] = useState(false);
  const dropdownRefDoughnut = useRef(null);

  const initialDataDoughnut = {
    labels: [
      "Most Vulnerable Communities",
      "Daily Wage Workers",
      "Organised Sector",
    ],
    datasets: [
      {
        label: "Number of Individuals",
        data: [71, 554, 11],
        backgroundColor: ["#65190b", "#ce441a", "#919191"],
        borderWidth: 2,
      },
    ],
  };

  const optionsDoughnut = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  const filteredDataDoughnut = {
    ...initialDataDoughnut,
    labels: initialDataDoughnut.labels.filter((label) =>
      filtersDoughnut[label]
    ),
    datasets: [
      {
        ...initialDataDoughnut.datasets[0],
        data: initialDataDoughnut.datasets[0].data.filter((_, index) =>
          filtersDoughnut[initialDataDoughnut.labels[index]]
        ),
        backgroundColor: initialDataDoughnut.datasets[0].backgroundColor.filter(
          (_, index) => filtersDoughnut[initialDataDoughnut.labels[index]]
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
        (dropdownOpenPie &&
          dropdownRefPie.current &&
          !dropdownRefPie.current.contains(event.target)) ||
        (dropdownOpenDoughnut &&
          dropdownRefDoughnut.current &&
          !dropdownRefDoughnut.current.contains(event.target))
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
    <div className="bg-white flex flex-col items-center justify-center w-full min-h-screen p-8 ">
      <div className="flex flex-col md:flex-row justify-center items-center w-full space-y-6 md:space-y-0 md:space-x-6">
        {/* Pie Chart Section */}
        <div className="bg-white shadow-2xl rounded-xl p-6 w-full md:w-[45%] flex flex-col items-center relative">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3e4c63] mb-4">
            Family Income Distribution
          </h2>
          <button
            onClick={toggleDropdownPie}
            className="bg-gradient-to-r from-[#ce441a] to-[#65190b] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out mb-4"
          >
            Filter Data <IoChevronDown className="inline ml-2" />
          </button>
          {dropdownOpenPie && (
            <div
              ref={dropdownRefPie}
              className="mt-4 bg-[#2e2f42] text-white p-4 rounded-lg w-60 absolute top-[100%] z-10 shadow-2xl"
            >
              {Object.keys(filtersPie).map((label) => (
                <label
                  key={label}
                  className="block text-left cursor-pointer hover:bg-[#40465b] p-2 rounded-md"
                >
                  <input
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
          <div className="w-full h-[60vh] flex justify-center">
            <Pie data={updatedDataPie} options={optionsPie} />
          </div>
        </div>

        {/* Doughnut Chart Section */}
        <div className="bg-white shadow-2xl rounded-xl p-6 w-full md:w-[45%] flex flex-col justify-center items-center relative">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3e4c63] mb-4">
            Individuals by Community Type
          </h2>
          <button
            onClick={toggleDropdownDoughnut}
            className="bg-gradient-to-r from-[#ce441a] to-[#65190b] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out mb-2"
          >
            Filter Data <IoChevronDown className="inline ml-2" />
          </button>
          {dropdownOpenDoughnut && (
            <div
              ref={dropdownRefDoughnut}
              className="mt-2 bg-[#2e2f42] text-white p-4 rounded-lg w-60 absolute top-[100%] z-10 shadow-2xl"
            >
              {Object.keys(filtersDoughnut).map((label) => (
                <label
                  key={label}
                  className="block text-left cursor-pointer hover:bg-[#40465b] p-2 rounded-md"
                >
                  <input
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
          <div className="w-full h-[60vh] flex justify-center">
            <Doughnut data={filteredDataDoughnut} options={optionsDoughnut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataChart2;
