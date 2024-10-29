import React, { useState, useRef, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart2 = () => {
  const [filtersPie, setFiltersPie] = useState({
    "Upto INR 5,000": true,
    "Upto INR 10,000": true,
    "Upto INR 15,000": true,
  });

  const dropdownRefPie = useRef(null);

  const dataPie = {
    labels: ["Upto INR 5,000", "Upto INR 10,000", "Upto INR 15,000"],
    datasets: [
      {
        label: "Family Income Distribution",
        data: [420, 206, 9],
        backgroundColor: ["#919191", "#3c3950", "#ce441a"],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  const filteredDataPie = {
    ...dataPie,
    labels: dataPie.labels.filter((label) => filtersPie[label]),
    datasets: [
      {
        ...dataPie.datasets[0],
        data: dataPie.datasets[0].data.filter((_, index) => filtersPie[dataPie.labels[index]]),
        backgroundColor: dataPie.datasets[0].backgroundColor.filter((_, index) => filtersPie[dataPie.labels[index]]),
      },
    ],
  };

  const genderData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Number of Scholarships Disbursed",
        data: [558, 79],
        backgroundColor: "#86250f",
        borderWidth: 2,
        borderRadius: 10,
        barThickness: 55,
        hoverBackgroundColor: "#e8461e",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(33, 35, 49, 0.4)",
        },
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Gender",
          font: {
            size: 16,  // Font size for the x-axis title
            weight: "bold",  // Make the font bold
          },
          color: "#e8461e",  // Color for the x-axis title
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(33, 35, 49, 0.3)",
        },
        grid: {
          color: "rgba(33, 35, 49, 0.2)",
        },
        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 16,  // Font size for the y-axis title
            weight: "bold",  // Make the font bold
          },
          color: "#e8461e",  // Color for the y-axis title
        },
      },
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefPie.current && !dropdownRefPie.current.contains(event.target)
      ) {
        // Handle dropdown close logic if needed
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#dcdcdc] flex max-md:flex-col items-center justify-evenly w-full p-8 max-md:px-4 max-md:space-y-5 font-lato">
      {/* Pie Chart Section */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full h-[76vh] md:w-[45%] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Family Income Distribution
        </h2>
        <div className="w-full h-[60vh] flex justify-center">
          <Pie data={filteredDataPie} options={optionsPie} />
        </div>
      </div>

      {/* Gender Chart Section */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full h-[76vh] md:w-[45%] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Number of Scholarships Disbursed by Gender
        </h2>
        <div className="w-full h-[60vh] flex justify-center">
          <Bar data={genderData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataChart2;
