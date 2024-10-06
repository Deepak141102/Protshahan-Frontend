import { React, useState } from "react";
import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { filter, style } from "d3";
import { color, map } from "highcharts";
import { icon } from "leaflet";

// Register the necessary components for Chart.js
ChartJS.register(
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const SpiderChart = () => {
  console.log("art is rendering...");

  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2024);

  // Sample data for different years
  const allData = {
    2020: [120, 90, 70, 40], // Data for 2020
    2021: [100, 80, 60, 30], // Data for 2021
    2022: [130, 100, 85, 50], // Data for 2022
    2023: [110, 95, 65, 35], // Data for 2023
    2024: [140, 110, 90, 60], // Data for 2024
  };

  // Filtered data based on the selected year range
  const yearFilter = () => {
    const selectedYears = Object.keys(allData)
      .filter((year) => year >= startYear && year <= endYear)
      .map((year) => allData[year]);

    // Combine data for selected years (sum values across years)
    return selectedYears.reduce(
      (acc, curr) => {
        return acc.map((value, index) => value + curr[index]);
      },
      [0, 0, 0, 0]
    ); // Initialize with 0 values
  };

  const yearData = {
    labels: ["20-25", "26-30", "31-35", "36-40"], // Age groups
    datasets: [
      {
        label: "No. of Applications",
        data: yearFilter(),
        backgroundColor: [
          "rgba(106, 0, 244, 0.8)",
          "rgba(0, 183, 255, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(255, 193, 7, 0.8)",
        ],
        borderColor: [
          "rgba(106, 0, 244, 1)",
          "rgba(0, 183, 255, 1)",
          "rgba(244, 67, 54, 1)",
          "rgba(255, 193, 7, 1)",
        ],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const yearOption = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Chart-9 (Education*) - Scholarships by Age Group",
        color: "#fff",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  // Dropdown options for the years
  const years = [2020, 2021, 2022, 2023, 2024];
  // Sample data
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const data = {
    labels: [
      "Creativity",
      "Communication",
      "Technical Skills",
      "Teamwork",
      "Problem Solving",
    ],

    datasets: [
      {
        label: "Gujarat",
        data: [80, 70, 90, 85, 75],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Karnataka",
        data: [70, 90, 80, 75, 85],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Maharashtra",
        data: [60, 80, 75, 90, 85],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const filteredData =
    selectedRegion === "All"
      ? data.datasets
      : data.datasets.filter((dataset) => dataset.label === selectedRegion);

  const chartData = {
    labels: data.labels,
    datasets: filteredData,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      tension: {
        duration: 1000,
        easing: "easeInOutQuad",
        from: 0.5,
        to: 1,
        loop: true,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: "black", // Change tick color for better visibility
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Grid color for better contrast
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Change legend text color
        },
      },
      title: {
        display: true,
        text: "Skills Comparison",
        font: {
          size: 24,
          weight: "bold",
          color: "white", // Title color
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
      },
    },
  };

  const handleFilterSelection = (region) => {
    setSelectedRegion(region);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <>
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
            </div>
            <div className="flex items-center ml-10 mt-9 max-md:justify-end mr-10 relative left-10 max-md:left-0  top-14">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-purple-400 text-lg cursor-pointer mr-2 hover:text-purple-600 transition-all duration-300 max-md:text-2xl"
                onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              />
              {isDropdownOpen && (
                <div className="absolute md:left-6 top-8 mt-2 bg-black bg-opacity-80 border border-purple-500 shadow-lg rounded-md z-10 w-48 transition-all duration-500 ease-in-out transform">
                  <ul className="py-2 text-white">
                    <li
                      className="px-4 py-2 hover:bg-purple-700 cursor-pointer"
                      onClick={() => handleFilterSelection("All")}
                    >
                      All
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-purple-700 cursor-pointer"
                      onClick={() => handleFilterSelection("Gujarat")}
                    >
                      Gujarat
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-purple-700 cursor-pointer"
                      onClick={() => handleFilterSelection("Karnataka")}
                    >
                      Karnataka
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-purple-700 cursor-pointer"
                      onClick={() => handleFilterSelection("Maharashtra")}
                    >
                      Maharashtra
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center">
              <div className="h-[60vh] w-1/2 max-md:w-full justify-center items-center">
                {/* Adjusted to allow height to adjust */}
                <Radar data={chartData} options={options} />
              </div>
              <div className="w-1/2 max-md:w-full mt-9">
                <div className="filters flex justify-center flex-wrap max-md:gap-4 items-center mb-9">
                  <div
                    style={{
                      marginRight: "20px",
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                      widows: "50%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ marginRight: "10px" }}
                    />
                    <label className="max-md:text-2xl">Start Year:</label>
                    <select
                      className="ml-2 p-2 rounded-md border-none bg-[#131a48] text-[#fff] max-md:px-10 max-md:py-5 max-md:text-2xl"
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ marginRight: "10px" }}
                    />
                    <label className="max-md:text-2xl">End Year:</label>
                    <select
                      className="ml-2 p-2 rounded-md border-none bg-[#131a48] text-[#fff] max-md:px-10 max-md:py-5 max-md:text-2xl"
                      value={endYear}
                      onChange={(e) => setEndYear(Number(e.target.value))}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Bar data={yearData} options={yearOption} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpiderChart;
