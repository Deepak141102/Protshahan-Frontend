import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IoMdArrowRoundBack } from "react-icons/io";
import yearlyData from './YearlyMonthlyData.json'; // Import the JSON file for yearly data
import studentData from './StudentPassOut.json'; // Import the JSON file for student pass out data
import Education2 from './Education2'
import GraphPage from './Onec';
// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Education = () => {
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [showMonthlyChart, setShowMonthlyChart] = useState(false);

  // Prepare data for yearly chart
  const yearlyChartData = {
    labels: yearlyData.map((item) => item.year),
    datasets: [
      {
        label: 'Yearly Batches',
        data: yearlyData.map((item) => item.total),
        backgroundColor: ['#df6b4f', '#e0461f', '#86250f'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for monthly chart when a year is selected
  const monthlyData = selectedYearData
    ? {
      labels: Object.keys(selectedYearData.monthWise),
      datasets: [
        {
          label: `Monthly Data for ${selectedYearData.year}`,
          data: Object.values(selectedYearData.monthWise),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    }
    : null;

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      setSelectedYearData(yearlyData[clickedIndex]);
      setShowMonthlyChart(true); // Trigger transition to monthly chart
    }
  };

  const handleBackClick = () => {
    setShowMonthlyChart(false); // Go back to yearly chart
  };

  // Prepare Student Pass Out Data
  const prepareStudentChartData = () => {
    const years = [];
    const subjects = {};

    studentData.forEach(item => {
      years.push(item.year);
      item.classwise.forEach(cls => {
        Object.keys(cls.subjectWise).forEach(subject => {
          if (!subjects[subject]) {
            subjects[subject] = Array(studentData.length).fill(0);
          }
          const yearIndex = years.indexOf(item.year);
          subjects[subject][yearIndex] += cls.subjectWise[subject];
        });
      });
    });

    return {
      labels: years,
      datasets: Object.keys(subjects).map((subject, index) => ({
        label: subject,
        data: subjects[subject],
        backgroundColor: `rgba(${index * 30}, 100, 200, 0.5)`, // Different colors for each subject
        borderColor: `rgba(${index * 30}, 100, 200, 1)`,
        borderWidth: 1,
      })),
    };
  };


  return (
     <div className="bg-[#3c3950] min-h-screen">
      <div className="bg-[#212331] text-white py-8 px-12">
        <div className="flex text-4xl p-4">
          <h1 className="text-yellow-400 pl-4">
            Protsahan - For a Better Future | Data Visualization
          </h1>
        </div>
        <div className="bg-white py-11 rounded-lg shadow-lg">
          <div className="border-[2px] border-dashed border-[#212331] rounded-md p-5 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              <div className="text-black">
                <span className="text-[#e8461e] mr-2">Timeline:</span>
                Child entering Protsahan
              </div>
              <div className="flex flex-wrap justify-center">
                <p className="text-black text-center">
                  <span className="text-[#e8461e] mr-2">
                    Potential Consumers:
                  </span>
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4 text-black">
              <p>
                These set of data visualisations paints a story of the
                enrolment data of students on a specified date range/month/year.
                It tells the user how many children have enrolled in Protsahan,
                basic data related to the pool of children, etc.
              </p>
            </div>
          </div>
          <div className="flex justify-center p-4  mb-40 max-md:w-full ">
            <div className="max-w-3xl w-full relative overflow-hidden bg-white rounded-lg shadow-md">
              {/* Yearly Bar Chart - Animate slide out when clicked */}
              <div className={`transition-transform duration-700 ease-in-out transform ${showMonthlyChart ? '-translate-x-full' : 'translate-x-0'}`}>
                <h2 className="text-xl font-bold text-center mb-4">Number of Lectures (Yearly)</h2>
                <div className="p-4 pb-12 rounded-lg shadow-md">
                  <Bar
                    data={yearlyChartData}
                    options={{
                      onClick: (evt, elements) => handleBarClick(elements),
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false, // Hide the legend
                          onClick: (e) => e.stopPropagation(), // Prevent default click behavior

                        },
                      },
                    }}
                  />
                  {/* Add instruction message here */}
                  <p className="text-yellow-300 text-center mt-2">
                    Click on a bar to see monthly data!
                  </p>
                </div>
              </div>

              {/* Monthly Bar Chart - Initially hidden, slides in vertically with fade effect */}
              {selectedYearData && (
                <div
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${showMonthlyChart ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                >
                  <div className="flex justify-start p-4 ">
                    <button
                      className="bg-gradient-to-r from-gray-800 to-gray-600 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={handleBackClick}
                    >
                      <IoMdArrowRoundBack className="text-white text-2xl hover:text-gray-300 transition-all" />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-center mb-4">Number of Lectures in  {selectedYearData.year} (Monthly)</h2>
                  <div className="p-4 ">
                    <Bar
                      data={monthlyData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false, // Hide the legend
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Student Pass Out Data */}
          <Education2 />
          {/* <GraphPage/> */}
        </div>
      </div>
    </div>
  );
};

export default Education;
