import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { scaleQuantize } from "d3-scale";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const GraphThird = () => {
  const [isPieDropdownOpen, setPieDropdownOpen] = useState(false);
  const [isBarDropdownOpen, setBarDropdownOpen] = useState(false);
  const [isLineDropdownOpen, setLineDropdownOpen] = useState(false);
  const [selectedPieFilter, setSelectedPieFilter] = useState("All");
  const [selectedBarFilter, setSelectedBarFilter] = useState("All");
  const [selectedLineFilter, setSelectedLineFilter] = useState("All");

  // Sample filter options for charts
  const pieFilters = ["All", "UP", "Bihar", "Kerala", "Punjab"];
  const barFilters = ["All", "Intra-district", "Inter-district", "Interstate"];
  const lineFilters = [
    "All",
    "Jan'23",
    "Feb'23",
    "Mar'23",
    "Apr'23",
    "May'23",
    "Jun'23",
  ];

  const regions = {
    Rural: 68,
    "Semi-Rural": 20,
    "Semi-Urban": 12,
  };

  const colorScale = scaleQuantize()
    .domain([0, 100])
    .range(["#FF6A6A", "#FF4C4C", "#FF1A1A"]);

  // Base Pie Data
  const pieDataBase = {
    labels: ["UP", "Bihar", "Kerala", "Punjab", "MP", "Goa", "Urban"],
    datasets: [
      {
        data: [26, 21, 15, 13, 10, 6, 9],
        backgroundColor: [
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FF9F40",
          "#9966FF",
          "#4BC0C0",
          "#C9CBCF",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Base Bar Data
  const barDataBase = {
    labels: [
      "Others",
      "Education",
      "Marriage",
      "After birth/with household",
      "Labour",
    ],
    datasets: [
      {
        type: "bar",
        label: "Intra-district",
        data: [23, 28, 22, 37, 18],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Inter-district",
        data: [49, 49, 42, 28, 31],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Interstate",
        data: [28, 22, 23, 23, 31],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Base Line Data
  const lineDataBase = {
    labels: ["Jan'23", "Feb'23", "Mar'23", "Apr'23", "May'23", "Jun'23"],
    datasets: [
      {
        label: "Migration Trend",
        data: [4.3, 2.5, 3.5, 4.5, 3.5, 5.4],
        fill: false,
        borderColor: "#FFCE56",
        tension: 0.4,
      },
    ],
  };

  // Filtering Logic
  const getFilteredPieData = () => {
    if (selectedPieFilter === "All") return pieDataBase;
    // Implement filtering logic based on selectedPieFilter
    // For demonstration, let's just filter to show UP data
    return {
      ...pieDataBase,
      datasets: [
        {
          ...pieDataBase.datasets[0],
          data: pieDataBase.datasets[0].data.map((d, index) => {
            return pieDataBase.labels[index] === selectedPieFilter ? d : 0;
          }),
        },
      ],
    };
  };

  const getFilteredBarData = () => {
    if (selectedBarFilter === "All") return barDataBase;
    // Implement filtering logic based on selectedBarFilter
    const filteredData = { ...barDataBase };
    filteredData.datasets = filteredData.datasets.filter(
      (dataset) => dataset.label === selectedBarFilter
    );
    return filteredData;
  };

  const getFilteredLineData = () => {
    if (selectedLineFilter === "All") return lineDataBase;
    // Implement filtering logic based on selectedLineFilter
    // Example: You could return only data for the selected month
    return {
      ...lineDataBase,
      datasets: [
        {
          ...lineDataBase.datasets[0],
          data: lineDataBase.datasets[0].data.map((d, index) =>
            index === lineFilters.indexOf(selectedLineFilter) ? d : null
          ),
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure charts resize properly
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Why People Migrate?" },
    },
  };

  const handlePieFilterSelection = (filter) => {
    setSelectedPieFilter(filter);
    setPieDropdownOpen(false);
  };

  const handleBarFilterSelection = (filter) => {
    setSelectedBarFilter(filter);
    setBarDropdownOpen(false);
  };

  const handleLineFilterSelection = (filter) => {
    setSelectedLineFilter(filter);
    setLineDropdownOpen(false);
  };

  return (
    <div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
      <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">
        <h1 className="max-md:text-center max-md:text-2xl">
          <span className="text-yellow-400 pl-4">Protsahan</span>
          -For a Better Future | Data Visualization(map 3)
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
                <span className="text-yellow-300">Potential Consumers:</span>
                Protsahan Executive Team | Governmental Bodies
              </p>
            </div>
          </div>
          <div className="text-center p-4">
            <p>
              These set of data visualisations paints the story of migrants. How
              and why are they migrating to Delhi (Urban Region)
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center  mt-9 relative flex-col w-1/3 max-md:w-full">
            <FontAwesomeIcon
              icon={faFilter}
              className=" absolute -top-9 right-0 max-md:right-4 max-md:text-2xl text-purple-400 text-lg cursor-pointer my-12 hover:text-purple-600 transition-all duration-300"
              onClick={() => setPieDropdownOpen(!isPieDropdownOpen)} // Toggle dropdown
            />
            {isPieDropdownOpen && (
              <div className="absolute right-0 top-8 bg-black bg-opacity-80 rounded-md shadow-md w-1/3">
                {pieFilters.map((filter) => (
                  <div
                    key={filter}
                    onClick={() => handlePieFilterSelection(filter)}
                    className="p-2 hover:bg-purple-400 cursor-pointer"
                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4 text-center bg-slate-600 bg-opacity-20 rounded-md p-3">
              Where the Children Are From
            </h2>{" "}
            <div className="h-64 w-full">
              <Pie data={getFilteredPieData()} options={options} />
            </div>
          </div>

          <div className="flex items-center ml-10 mt-9 relative flex-col w-1/2 max-md:w-full ">
            <FontAwesomeIcon
              icon={faFilter}
              className="absolute top-0 right-0 max-md:right-4 max-md:text-2xl text-purple-400 text-lg cursor-pointer mr-2 hover:text-purple-600 transition-all duration-300"
              onClick={() => setBarDropdownOpen(!isBarDropdownOpen)} // Toggle dropdown
            />
            {isBarDropdownOpen && (
              <div className="absolute right-0 top-8 mt-2 bg-black bg-opacity-80 rounded-md shadow-md w-1/4">
                {barFilters.map((filter) => (
                  <div
                    key={filter}
                    onClick={() => handleBarFilterSelection(filter)}
                    className="p-2 hover:bg-purple-400 cursor-pointer"
                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4 text-center bg-slate-600 bg-opacity-20 rounded-md p-3">
              Why People Migrate?
            </h2>{" "}
            <div className="h-64 w-full">
              <Bar data={getFilteredBarData()} options={options} />
            </div>
          </div>

          <div className="flex items-center ml-10 mt-12 relative flex-col w-1/2 max-md:w-full">
            <FontAwesomeIcon
              icon={faFilter}
              className="absolute top-0 right-0 max-md:right-4 max-md:text-2xl text-purple-400 text-lg cursor-pointer mr-2 hover:text-purple-600 transition-all duration-300"
              onClick={() => setLineDropdownOpen(!isLineDropdownOpen)} // Toggle dropdown
            />
            {isLineDropdownOpen && (
              <div className="absolute right-0 top-8 mt-2 bg-black bg-opacity-80 rounded-md shadow-md w-1/4">
                {lineFilters.map((filter) => (
                  <div
                    key={filter}
                    onClick={() => handleLineFilterSelection(filter)}
                    className="p-2 hover:bg-purple-400 cursor-pointer"
                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4 text-center bg-slate-600 bg-opacity-20 rounded-md p-3">
              Migration Trend Over Months
            </h2>{" "}
            <div className="h-64 w-full">
              <Line data={getFilteredLineData()} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphThird;
