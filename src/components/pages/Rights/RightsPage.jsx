// Importing necessary modules and components
import React, { useState, useEffect } from "react"; // Import React, useState, useEffect hooks for managing component state and side effects
import { Doughnut, Pie } from "react-chartjs-2"; // Import Doughnut and Pie chart components from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary modules from Chart.js
import CounterSection from "./CounterSection"; // Import CounterSection component
import DataChart2 from "./DoughnutPie"; // Import DataChart2 component
import DataChart1 from "./LineBar"; // Import DataChart1 component
import IndiaMap from "./IndiaMap"; // Import IndiaMap component
import occupationsData from "./Data.json"; // Import data from a local JSON file
import GovtLinkage from "../Education/Category"; // Import GovtLinkage component

// Register Chart.js components to use ArcElement, Tooltip, and Legend
ChartJS.register(ArcElement, Tooltip, Legend);

const Rights = () => {
  // State for selected data type, initially set to "gender"
  const [selectedData, setSelectedData] = useState("gender");

  // Define data for the age chart
  const ageData = {
    labels: ["4-9 Years", "10-19 Years", "20-29 Years"], // Age groups as labels
    datasets: [
      {
        data: [28, 552, 57], // Data values for each age group
        backgroundColor: ["#3c3950", "#ce441a", "#919191"], // Colors for each section
        borderColor: "#fff", // Border color for each section
        borderWidth: 2, // Border width
        hoverBackgroundColor: ["#121331", "#86250f", "#919191"], // Hover colors for each section
      },
    ],
  };

  // Define options for the age chart
  const AgeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: (e) => e.stopPropagation(), // Prevents legend click filtering
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`, // Custom label for tooltip
        },
        backgroundColor: "#65190b", // Tooltip background color
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body text color
      },
    },
  };

  // State for profession data, initially null
  const [professionData, setProfessionData] = useState(null);

  // Effect hook to load and prepare profession data
  useEffect(() => {
    // Extract employment data and total count from JSON
    const employmentData = occupationsData.parent_profession.employment_data;
    const totalCount = occupationsData.parent_profession.total_count;

    // Flatten employment data for organized sector categories
    const flattenedData = employmentData.flatMap((item) => {
      if (item.category === "Organised Sector" && item.details) {
        return item.details.map((detail) => ({
          category: `${item.category} - ${detail.role}`, // Category includes role
          count: detail.count,
        }));
      }
      return { category: item.category, count: item.count };
    });

    // Calculate percentages for each category
    const finalData = flattenedData.map((item) => ({
      category: item.category,
      count: item.count,
      percentage: (item.count / totalCount) * 100, // Calculate percentage
    }));

    // Filter data to exclude categories with count < 5
    const filteredData = finalData.filter((item) => item.count >= 5);

    // Set the prepared data to the professionData state
    setProfessionData({
      labels: filteredData.map((item) => item.category),
      datasets: [
        {
          label: "Profession Percentage",
          data: filteredData.map((item) => item.percentage),
          backgroundColor: [
            "rgb(224, 70, 31)",
            "rgb(101, 25, 11)",
            "rgb(134, 37, 15)",
            "rgb(223, 107, 79)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  // Options for profession chart
  const professionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null, // Disable legend filtering on click
      },
      tooltip: {
        callbacks: {
          // Tooltip with custom percentage label
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = professionData.datasets[0].data[index];
            return `${tooltipItem.dataset.label}: ${percentage.toFixed(
              2
            )}%  from the total [${occupationsData.parent_profession.total_count}]`;
          },
        },
      },
    },
  };

  // Component render
  return (
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-4 sm:px-11">
        <div className="flex text-2xl md:text-4xl p-4">
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
                  <span className="text-[#e8461e] mr-2">Potential Consumers:</span>
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
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 py-10 bg-[#dcdcdc] px-4">
              {/* Data Chart for Age Ratio */}
              <div className="flex flex-col w-full md:w-[45%]">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#212331]">
                    Age: 4-29 Years Boys & Girls
                  </h2>
                  <div className="flex justify-center items-center w-full h-[60vh]">
                    <Doughnut data={ageData} options={AgeOptions} />
                  </div>
                </div>
              </div>

              {/* Chart for Occupation of Guardians/Family */}
              <div className="flex flex-col w-full md:w-[45%]">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#212331]">
                    Occupation of the Guardians / Family
                  </h2>
                  <div className="flex justify-center items-center w-full h-[60vh]">
                    {professionData && (
                      <Pie data={professionData} options={professionOptions} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* India Map Section */}
            <IndiaMap />
            <DataChart1 />
            <DataChart2 />
            <GovtLinkage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rights;
