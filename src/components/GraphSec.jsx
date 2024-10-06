import React, { useState } from "react";
import { PolarArea, Line } from "react-chartjs-2"; // Import PolarArea chart from react-chartjs-2
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";



const GraphSec = () => {
  console.log('GraphSec is rendering...');

  // Year selection state
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2023);

  // Available years for selection
  const years = [2020, 2021, 2022, 2023, 2024];

  // Original data for the polar area chart
  const originalData = {
    labels: [
      "Year 2020",
      "Year 2021",
      "Year 2022",
      "Year 2023",
      "Year 2024",
    ],
    datasets: [
      {
        label: "Children Affected",
        data: [111, 118, 462, 118, 132], // Example data
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ["Age 0-4", "Age 5-9", "Age 10-14", "Age 15-19", "Age 20-24"],
    datasets: [
      {
        label: "Aanganwadi",
        data: [178, 267, 634, 110, 54],
        borderColor: "#FFD700",
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "School Admission",
        data: [78, 220, 534, 232, 12],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Aadhaar",
        data: [12, 56, 78, 90, 31],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "PAN",
        data: [9, 35, 67, 45, 12],
        borderColor: "#9966FF",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Ration Card",
        data: [11, 10, 78, 34, 54],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Filter the data based on the selected start and end years
  const filteredData = originalData.datasets[0].data.slice(
    startYear - 2020,
    endYear - 2019
  );

  // Update the polar area chart data
  const updatedPolarData = {
    ...originalData,
    datasets: [{ ...originalData.datasets[0], data: filteredData }],
  };

  const polarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Customize grid color
        },
        ticks: {
          color: "black",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Age Group",
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        title: {
          display: true,
          text: "Children Affected",
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
<div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
        <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">      <div className="flex text-4xl ">
        <h1 className="max-md:text-center max-md:text-2xl">
          <span className="text-yellow-400 pl-4">Protsahan</span>
          -For a Better Future | Data Visualization (map 2)
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
              <span className="text-yellow-300">Potential Consumers:</span>{" "}
              Protsahan Executive Team | Governmental Bodies
            </p>
          </div>
        </div>
        <div className="text-center p-4">
          <p>
          These set of data visualisations takes a deeper look into how Protsahan is empowering the children by providing them the necessary tools to come out of their
          traumatised lives and lead a normal lives.
          </p>
        </div>
      </div>

      {/* Year Filters */}
      <div className="flex  justify-center  my-10 w-1/2 max-md:w-full max-md:flex-col max-md:items-center max-md:space-y-4 ">
        <div
        className=" flex items-center text-white w-1/2"
          
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
          style={{ display: "flex", alignItems: "center", color: "#fff" }}
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

      <div className="flex flex-wrap justify-center">
        {/* Polar Area Chart */}
        <div className="w-1/3 max-md:w-full p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Polar Area Chart (Children Affected)
          </h2>
          <PolarArea data={updatedPolarData} options={polarOptions} />
        </div>

        {/* Line Chart */}
        <div className="w-1/2 max-md:w-full p-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Line Chart
          </h2>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div></div></div>
  );
};

export default GraphSec;
