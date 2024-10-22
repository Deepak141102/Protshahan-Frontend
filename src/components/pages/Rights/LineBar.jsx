import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

const DataChart1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scholarshipData = {
    labels: [
      "Disability Scholarship",
      "Merit Scholarship",
      "Need-Based Equity",
      "Need-Based Equity, Disability Scholarship",
      "Need-Based Equity, Merit Scholarship",
      "STEM Scholarship (Science Stream)",
    ],
    datasets: [
      {
        label: "Number of Scholarships",
        data: [20, 19, 531, 1, 55, 2],
        backgroundColor: "#ce441a",
        borderColor: "#e8461e",
        borderWidth: 2,
        borderRadius: 10,
        // Add barThickness property to control bar width
        barThickness: 15, // Adjust this value for desired bar width
      },
    ],
  };

  const genderData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Number of Scholarships Disbursed",
        data: [558, 79],
        backgroundColor: "#e8461e",
        borderWidth: 2,
        borderRadius: 10,
        barThickness: 55, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    layout: {
      padding: {
        top: 10,
        left: isMobile ? 5 : 20,
        right: isMobile ? 5 : 20,
        bottom: 10,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgb(33, 35, 49, 0.4)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgb(33, 35, 49, 0.3)",
          font: {
            size: isMobile ? 9 : 12,
          },
        },
        grid: {
          color: "rgb(33, 35, 49, 0.2)",
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderColor: "rgb(33, 35, 49, 0.1)",
      },
    },
  };

  return (
    <div className="bg-[#dcdcdc] flex justify-center flex-col md:flex-row my-auto font-lato gap-4 items-center pb-16">
      <div className="w-[47%] max-md:w-11/12 bg-white shadow-2xl p-10 mb-4 md:mb-0 rounded-xl">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Categories of Scholarship
        </h2>
        <div className="w-full  h-[50vh]">
          <Line data={scholarshipData} options={options} />
        </div>
      </div>
      <div className="w-[47%] max-md:w-11/12  bg-white shadow-2xl p-10 rounded-xl">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Number of Scholarships Disbursed by Gender
        </h2>
        <div className="w-full  h-[50vh]">
          <Bar data={genderData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataChart1;
