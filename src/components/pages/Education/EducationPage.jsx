import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import yearlyData from "./YearlyMonthlyData.json"; // Yearly data
import studentData from "./StudentPassOut.json"; // Student pass out data
import GovtLinkage from "./Category";



// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Education = () => {
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [showMonthlyChart, setShowMonthlyChart] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [yearlyStudentData, setYearlyStudentData] = useState(true);

  // Prepare data for yearly chart (Batches)
  const yearlyChartData = {
    labels: yearlyData.map((item) => item.year),
    datasets: [
      {
        label: "Yearly Batches",
        data: yearlyData.map((item) => item.total),
        backgroundColor: ["#df6b4f", "#e0461f", "#86250f"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for monthly chart
  const monthlyData = selectedYearData
    ? {
      labels: Object.keys(selectedYearData.monthWise),
      datasets: [
        {
          label: `Monthly Data for ${selectedYearData.year}`,
          data: Object.values(selectedYearData.monthWise),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    }
    : null;

  // Prepare Student Pass Out Data
  const colorMap = {
    History: "#e0461f",
    "Political Science": "#f25c54",
    "Social Studies": "#86250f",
    Mathematics: "#df6b4f",
    Science: "#65190b",
  };

  const getYearlyStudentData = () => {
    const years = studentData.map((data) => data.year);
    const subjects = [
      ...new Set(
        studentData.flatMap((data) =>
          data.classwise.flatMap((cw) => Object.keys(cw.subjectWise))
        )
      ),
    ];

    const datasets = subjects.map((subject) => ({
      label: subject,
      data: studentData.map((data) => {
        const total = data.classwise.reduce(
          (sum, cw) => sum + (cw.subjectWise[subject] || 0),
          0
        );
        return total;
      }),
      backgroundColor: colorMap[subject] || "#dc2f02",
    }));

    return {
      labels: years,
      datasets,
    };
  };

  const getClasswiseStudentData = (subject) => {
    const classwise = studentData.flatMap((data) =>
      data.classwise.map((cw) => ({
        class: cw.class,
        value: cw.subjectWise[subject] || 0,
      }))
    );

    const classLabels = [...new Set(classwise.map((cw) => cw.class))];
    const classData = classLabels.map((cls) =>
      classwise
        .filter((cw) => cw.class === cls)
        .reduce((sum, cw) => sum + cw.value, 0)
    );

    return {
      labels: classLabels,
      datasets: [
        {
          label: subject,
          data: classData,
          backgroundColor: colorMap[subject] || "#dc2f02",
        },
      ],
    };
  };

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      setSelectedYearData(yearlyData[clickedIndex]);
      setShowMonthlyChart(true); // Switch to monthly chart
    }
  };

  const handleStudentClick = (event, elements) => {
    if (elements.length > 0) {
      const subject = event.chart.data.datasets[elements[0].datasetIndex].label;
      setSelectedSubject(subject);
      setYearlyStudentData(false);
    }
  };

  const handleBackClick = () => {
    setShowMonthlyChart(false); // Go back to yearly chart
  };

  const handleStudentBackClick = () => {
    setYearlyStudentData(true);
    setSelectedSubject(null); // Reset selected subject
  };

  const studentChartData = yearlyStudentData
    ? getYearlyStudentData()
    : getClasswiseStudentData(selectedSubject);

  // Common chart options
  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow full control over height
    height: "80vh",
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
        onClick: (e) => e.stopPropagation(),
      },
    },
  };

  return (
    <div className="bg-[#3c3950] min-h-screen font-lato">
    <div className="bg-[#212331] text-white py-8 px-11 max-md:px-0">
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
          <p className="text-center p-4">
              These data visualizations show the enrollment and academic
              performance of students.
            </p>
          </div>
        </div>

          <div className="flex justify-center py-10 px-4  bg-[#dcdcdc] gap-4 max-md:flex-col">
            {/* Yearly Bar Chart */}
            <div className="w-full max-md:w-full h-[75vh] max-md:h-[85vh] relative overflow-hidden bg-white p-4 rounded-lg shadow-md">
              <div
                className={`transition-transform duration-700 ease-in-out transform ${showMonthlyChart ? "-translate-x-[45rem]" : "translate-x-0"
                  }`}
              >
                <h2 className="text-xl font-bold text-center mb-4 text-[#212331]">
                  Number of Lectures (Yearly)
                </h2>

                {/* Set responsive height for the chart container */}
                <div className="h-[57.6vh] max-md:h-[66vh] ">
                  <Bar
                    data={yearlyChartData}
                    options={{
                      ...commonChartOptions,
                      plugins: {
                        ...commonChartOptions.plugins,
                        legend: {
                          display: false, // Hides the legend only for this chart
                        },
                      },
                      onClick: (evt, elements) => handleBarClick(elements),
                    }}
                  />
                </div>

                <p className="text-[#e8461e] text-center mt-2 font-bold text-[20px]">
                  Click on a bar to view monthly data!
                </p>
              </div>

              {/* Monthly Bar Chart */}
              {selectedYearData && (
                <div
                  className={`absolute top-0 left-0 w-full pb-36 px-4 overflow-hidden h-full transition-all duration-700 ease-in-out transform ${showMonthlyChart
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-full opacity-0"
                    }`}
                >
                  <div className="flex justify-start p-4">
                    <button
                      className="bg-gradient-to-r from-gray-800 to-gray-600 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={handleBackClick}
                    >
                      <IoMdArrowRoundBack className="text-white text-2xl hover:text-gray-300 transition-all" />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-center mb-4 text-[#212331]">
                    Number of Lectures in {selectedYearData.year} (Monthly)
                  </h2>
                  {/* Set responsive height for the monthly chart container */}
                  <div className="h-[60vh] max-md:h-[68vh] pb-14">
                    <Bar data={monthlyData}
                      options={{
                        ...commonChartOptions,
                        plugins: {
                          ...commonChartOptions.plugins,
                          legend: {
                            display: false, // Hides the legend only for this chart
                          },
                        },
                        onClick: (evt, elements) => handleBarClick(elements),
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Student Pass Out Chart */}
            <div className="w-full max-md:w-full h-[75vh] max-md:h-[85vh] relative overflow-hidden bg-white p-4 rounded-lg shadow-md">
              {selectedSubject && (
                <div className="flex justify-start p-4 pt-0">
                  <button
                    className="bg-gradient-to-r w-12 from-gray-800 to-gray-600 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    onClick={handleStudentBackClick}
                  >
                    <IoMdArrowRoundBack className="text-white text-2xl hover:text-gray-300 transition-all" />
                  </button>
                </div>
              )}

              {/* Conditionally render the heading only if selectedSubject is not set */}
              <h2 className="text-xl font-bold text-center mb-4 text-[#212331]">
                Number of Students Passed Out
              </h2>

              {/* Set responsive height for the student chart container */}
              <div className="h-[55.5vh] max-md:h-[66vh]">
                <Bar
                  data={studentChartData}
                  options={{
                    ...commonChartOptions,
                    onClick: (evt, elements) => handleStudentClick(evt, elements),
                  }}
                />
              </div>
              {!selectedSubject && (
                <h2 className="text-[#e8461e] text-center mt-2 font-bold text-[20px]">
                  Click on a bar to view passed students data!
                </h2>
              )}
            </div>
          </div>
          <GovtLinkage />


        </div>
      </div>
    </div>
  );
};

export default Education;
