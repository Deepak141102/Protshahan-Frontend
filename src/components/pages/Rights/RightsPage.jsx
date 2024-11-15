import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import DataChart2 from "./DoughnutPie";
import DataChart1 from "./LineBar";
import IndiaMap from "./IndiaMap";
import occupationsData from "./Data.json";
import GovtLinkage from "../Education/Category";
import HomeVisitsPieChart from "./HomeVisitsAndDistribution";
import ServiverChart from "./IssuesChart1";
import LostChart from "./IssuesChart2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Rights = () => {
  const [selectedData, setSelectedData] = useState("gender");

  // Destructure the data with a fallback to empty objects or default values
  const {
    "4-9 Years": fourToNine = { count: 0, percentage: 0 },
    "10-19 Years": tenToNineteen = { count: 0, percentage: 0 },
    "20-29 Years": twentyToTwentyNine = { count: 0, percentage: 0 },
    total_people: { all: total = 0 } = {}, // Destructure `total_people` correctly
  } = occupationsData;

  // Data for the chart
  const data = {
    labels: ['4-9 Years', '10-19 Years', '20-29 Years'],
    datasets: [
      {
        label: 'Age Group Distribution',
        data: [fourToNine.count, tenToNineteen.count, twentyToTwentyNine.count], // Use the 'count' values
        backgroundColor: ["#3c3950", "#ce441a", "#919191"], // Colors for each section

      },
    ],
  };

  const ageOptions = {
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
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const currentValue = tooltipItem.raw;
            // Ensure the total value is valid before dividing
            const percentage = total > 0 ? ((currentValue / total) * 100).toFixed(2) : 0;
            return `${currentValue} people (${percentage}%) from the total ${total} people`;
          },
        },
      },
    },
  };

  const [professionData, setProfessionData] = useState(null);

  useEffect(() => {
    const employmentData = occupationsData?.parent_profession?.employment_data || [];
    const totalCount = occupationsData?.parent_profession?.total_count || 1;

    const flattenedData = employmentData.flatMap((item) => {
      if (item.category === "Organised Sector" && item.details) {
        return item.details.map((detail) => ({
          category: `${item.category} - ${detail.role}`,
          count: detail.count,
        }));
      }
      return { category: item.category, count: item.count };
    });

    const finalData = flattenedData.map((item) => ({
      category: item.category,
      count: item.count,
      percentage: (item.count / totalCount) * 100,
    }));

    const filteredData = finalData.filter((item) => item.count >= 5);

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
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = professionData.datasets[0].data[index];
            return `${tooltipItem.dataset.label}: ${percentage.toFixed(2)}% from the total [${occupationsData.parent_profession.total_count}]`;
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
              <div className="flex flex-col w-full md:w-[45%]">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#212331]">
                    Age: 4-29 Years Boys & Girls
                  </h2>
                  <div className="flex justify-center items-center w-full h-[60vh]">
                    <Doughnut data={data} options={ageOptions} />
                  </div>
                </div>
              </div>

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
            <IndiaMap />
            <DataChart1 />
            <DataChart2 />
            <HomeVisitsPieChart/>
            <ServiverChart/>
            <LostChart/>
            <GovtLinkage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rights;
