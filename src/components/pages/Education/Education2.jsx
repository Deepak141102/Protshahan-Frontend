import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import studentData from "./StudentPassOut.json"; // Ensure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Ensure Font Awesome is installed

const Education2 = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [yearlyData, setYearlyData] = useState(true);

  const colorMap = {
    History: "#e0461f",
    "Political Science": "#f25c54",
    "Social Studies": "#86250f",
    Mathematics: "#df6b4f",
    Science: "#65190b",
  };

  const getYearlyData = () => {
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
      backgroundColor: colorMap[subject] || "#dc2f02", // Default color if subject not found
    }));

    return {
      labels: years,
      datasets,
    };
  };

  const getClasswiseData = (subject) => {
    const classwise = studentData.flatMap((data) =>
      data.classwise.map((cw) => ({
        class: cw.class,
        value: cw.subjectWise[subject] || 0,
      }))
    );

    const classLabels = [...new Set(classwise.map((cw) => cw.class))];
    const classData = classLabels.map((cls) => {
      return classwise
        .filter((cw) => cw.class === cls)
        .reduce((sum, cw) => sum + cw.value, 0);
    });

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

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const subject = event.chart.data.datasets[elements[0].datasetIndex].label;
      setSelectedSubject(subject);
      setYearlyData(false);
    }
  };

  const chartData = yearlyData
    ? getYearlyData()
    : getClasswiseData(selectedSubject);

  return (
    <div className="container mx-auto p-4 w-2/3 bg-white ">
      <h1 className="text-2xl font-bold text-center text-[#212331]">
        Student Data Visualization
      </h1>
      <div className="relative">
          {!yearlyData && (
            <button
              className="absolute top-0 left-12 max-md:left-0 z-10 p-3 max-md:p-1 bg-gradient-to-r from-gray-800 to-gray-600 
                 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 
                 ease-in-out flex justify-center items-center"
              onClick={() => {
                setYearlyData(true);
                setSelectedSubject(null);
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-white text-2xl max-md:w-5 max-md:h-5 hover:text-gray-300 transition-all"
              />
            </button>
          )}

        <div className="w-full max-md:h-[60vh] sm:h-[60vh]  md:h-[70vh] h-[70vh]">
          <Bar
            data={chartData}
            options={{
              onClick: handleClick,
              responsive: true,
              maintainAspectRatio: false, // Allow chart to fill container height
              plugins: {
                legend: {
                  position: "top",
                  onClick: (e) => e.stopPropagation(),
                  labels: {
                    boxWidth: 15,
                    padding: 20,
                    usePointStyle: true,
                  },
                },
              },
              layout: {
                padding: {
                  top: 20,
                  bottom: 20,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Education2;
