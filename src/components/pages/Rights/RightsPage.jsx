import React, { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import DataChart2 from "./DoughnutPie";
import DataChart1 from "./LineBar";
import IndiaMap from "./IndiaMap";
import occupationsData from "./Data.json"; 
import GovtLinkage from "../Education/Category";

ChartJS.register(ArcElement, Tooltip, Legend);

const Rights = () => {
  const [selectedData, setSelectedData] = useState("gender");

  // Data for age chart
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

  const AgeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // Optional: Control aspect ratio
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

  // Prepare data for the occupation chart
  const categories = occupationsData.occupations.map(
    (occupation) => occupation.category
  );
  const counts = occupationsData.occupations.map(
    (occupation) => occupation.count
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Number of Workers",
        data: counts,
        backgroundColor: [
          "rgba(223, 107, 79, 1)", // #3c3950
          "rgba(206, 68, 26, 1)", // #ce441a
          "rgba(145, 145, 145, 1)", // #919191
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // Optional: Control aspect ratio
    plugins: {
      legend: {
        display: true,
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
          label: (tooltipItem) => {
            const category = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${category}: ${count}`;
          },
        },
      },
    },
  };

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
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 py-10 bg-[#dcdcdc] px-4">
              {/* Data Chart for Age Ratio */}
              <div className="flex flex-col w-full md:w-[45%]">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#212331]">
                    Age: 4-29 Years Boys & Girls
                  </h2>
                  <div className="flex justify-center items-center w-full h-[60vh]"> {/* Fixed height for better responsiveness */}
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
                  <div className="flex justify-center items-center w-full h-[60vh]"> {/* Fixed height for better responsiveness */}
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
            {/* India Map Section */}
            <IndiaMap />

            <DataChart1 />

            {/* Data Chart 2 */}
            <DataChart2 />
            <GovtLinkage />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Rights;
