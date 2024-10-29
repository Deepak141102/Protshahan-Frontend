import React, { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import DataChart2 from "./DoughnutPie";
import DataChart1 from "./LineBar";
import IndiaMap from "./IndiaMap";
import occupationsData from "./Data.json"; // Import the occupations data

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
          <h1 className="text-[#e8461e]">
            Protsahan Rights Impact | Data Story
          </h1>
        </div>
        <div className="bg-[#3c3950] rounded-lg shadow-lg pt-4">
          <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
            <div className="text-center p-4 text-white">
              <p>
                Protsahan focuses on closely monitoring and actively working to stop child begging, forced or early marriages, and child abuse, while encouraging school enrollment for children who aren’t in school. Their approach is to prevent the need for placing children in state shelters by stepping in early, providing safety nets and support to children, families, and communities right where they live. This way, they’re able to offer safe and healing spaces within their own communities, keeping children connected to their families and giving them the protection and care they need.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg ">
            <CounterSection />

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-10 bg-[#dcdcdc]">
              {/* Data Chart for Age Ratio */}
              <div className="flex flex-col w-full md:w-1/2 lg:w-[40%] max-w-lg justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[50vh] lg:h-[70vh] justify-between items-center">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#212331]">
                    Age: 4-29 Years Boys & Girls
                  </h2>
                  <div className="flex justify-center items-center w-full h-full">
                    <Doughnut data={ageData} options={AgeOptions} />
                  </div>
                </div>
              </div>

              {/* Chart for Occupation of Guardians/Family */}
              <div className="flex flex-col w-full md:w-1/2 lg:w-[40%] max-w-lg justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[60vh] lg:h-[70vh] justify-center items-center">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 p-6 text-[#212331]">
                    Occupation of the Guardians / Family
                  </h2>
                  <div className="flex justify-center items-center w-full h-full">
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* India Map Section */}
              <IndiaMap />

            {/* Data Chart 1 */}
              <DataChart1 />

            {/* Data Chart 2 */}
            
              <DataChart2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rights;
