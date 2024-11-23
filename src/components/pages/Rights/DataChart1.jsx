import { React, useState, useRef, useEffect } from "react";
import {Doughnut } from "react-chartjs-2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";
import RightsPage2 from "../../RightsPage2";
import DataChart1 from "./DataChart3";

// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const DataChart1 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
    },
  };

  const [filters, setFilters] = useState({
    "Most Vulnerable Communities": true,
    "Daily Wage Workers": true,
    "Organised Sector": true,
  });

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleFilter = (label) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: !prevFilters[label],
    }));
  };

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
    <>
      <div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom font-lato">
        <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">
          {" "}
          <div className="flex text-4xl max-md:text-2xl mb-4">
            <h1 className="max-md:text-center max-md:text-2xl">
              <span className="text-yellow-400 pl-4">Protsahan</span>
              -For a Better Future | Duuata Visualization
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
                    </span>{" "}
                    Protsahan Executive Team | Governmental Bodies
                  </p>
                </div>
              </div>
              <div className="text-center p-4">
                <p>
                  These set of data visualisations takes a deeper look into how
                  Protsahan is empowering the children by providing them the
                  necessary tools to come out of their traumatised lives and
                  lead a normal lives.
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col">
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
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 top-[72px] bg-[#393d50] divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul className="py-2 text-max-sm text-white">
                      {initialData.labels.map((label) => (
                        <li key={label}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFilter(label);
                            }}
                            className="px-4 py-2 hover:bg-[#212331] flex items-center hover:text-[#e54c29]"
                          >
                            <input
                              type="checkbox"
                              checked={filters[label]}
                              readOnly
                              className="mr-2 no-cursor"
                            />
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <h2 className="text-xl max-sm:text-2xl font-bold mb-4 text-center">
                Individuals by Community Type
              </h2>
              <Doughnut data={filteredData} options={options} />
            </div>
            <RightsPage2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataChart1;
