import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { IoMdArrowRoundBack } from "react-icons/io";
import data from "../json/education/GovtLinkage.json"; // Ensure path is correct
import scholarData from "../json/rights/Data.json";

const DataChart7 = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [showCategoryChart, setShowCategoryChart] = useState(false);

  const yearData = Object.keys(data).map((year) => ({
    year,
    total: data[year].total_grand_total,
  }));

  const handleYearClick = (year) => {
    const yearDetails = data[year].data;
    setSelectedYear(year);
    setSelectedYearData(yearDetails);
    setShowCategoryChart(true);
  };

  const handleBackToYearlyChart = () => {
    setShowCategoryChart(false);
    setTimeout(() => {
      setSelectedYear(null);
      setSelectedYearData(null);
    }, 500); // Delay for smooth transition
  };

  const totalChartData = {
    labels: yearData.map((item) => item.year),
    datasets: [
      {
        label: "Grand Total",
        data: yearData.map((item) => item.total),
        backgroundColor: "rgba(224, 70, 31, 1)",
        borderColor: "rgba(224, 70, 31, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: selectedYearData
      ? selectedYearData.map((item) => item.category)
      : [],
    datasets: [
      {
        label: `Category Grand Total for ${selectedYear}`,
        data: selectedYearData
          ? selectedYearData.map((item) => item.grand_total)
          : [],
        backgroundColor: "#e0461f",
      },
    ],
  };
  // scholarship categories
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const scholarshipCategory = scholarData.Scholarship_category;

    // Extract categories and their values
    const labels = Object.keys(scholarshipCategory).filter(
      (key) => key !== "Scholar_total"
    );
    const values = labels.map((label) => scholarshipCategory[label]);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Scholarship Categories",
          data: values,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(134, 37, 15)", // Color 3
            "#919191", // Color 4
            "rgb(101, 25, 11)", // Color 2
            "#ce441a", // Color 5
            "#ce441a", // Color 6
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 10,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} scholarships`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Scholarship Categories",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          maxRotation: 0, // Keep the labels horizontal
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Scholarships",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Set increment to 10 for better readability
        },
      },
    },
  };

  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        {showCategoryChart && (
          <button
            className="transition-button"
            onClick={handleBackToYearlyChart}
          >
            <IoMdArrowRoundBack className="text-white text-2xl hover:text-gray-300" />
          </button>
        )}
        <h1 className="text-2xl font-semibold text-[#212331] text-center mb-4">
          Interactive Data Visualization
        </h1>
        <div className="chart-wrapper">
          <div
            className={`chart-container ${
              showCategoryChart ? "slide-out-left" : "slide-in-left"
            }`}
          >
            {!showCategoryChart && (
              <>
                <Bar
                  data={totalChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const year = yearData[elements[0].index].year;
                        handleYearClick(year);
                      }
                    },
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Years →",
                          color: "#e0461f",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Total Compensation →",
                          color: "#e0461f",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                      },
                    },
                  }}
                />
                <p className="text-center text-[#e0461f] mt-4 text-xl font-semibold">
                  Click on any bar to see the categories
                </p>
              </>
            )}
          </div>
          <div
            className={`chart-container ${
              showCategoryChart ? "slide-in-right" : "slide-out-right"
            }`}
          >
            {showCategoryChart && (
              <Bar
                data={categoryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Categories →",
                        color: "#9966ff",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Category Total →",
                        color: "#9966ff",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Scholarships that Matter: A Category Overview{" "}
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {chartData && <Bar data={chartData} options={options} />}
        </div>
      </div>
      <style>{`.chart-wrapper {
  position: relative;
  width: 100%;
  height: 60vh; /* Set height to 75vh for both charts */
  overflow: hidden;
}

.chart-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55vh;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
}

.slide-in-left {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-left {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in-right {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-right {
  transform: translateX(100%);
  opacity: 0;
}

.transition-button {
  background: linear-gradient(to right, #333, #555);
  padding: 0.75rem;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transition-button:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
`}</style>
    </div>
  );
};

export default DataChart7;
