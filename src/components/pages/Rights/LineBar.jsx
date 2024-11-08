import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
  PointElement, // Add this import for points in Line charts
} from "chart.js";
import scholarshipData from "./Data.json";

// Register all required components, including PointElement for Line chart points
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
  PointElement // Register PointElement here
);

const COLORS = ["#e54c29", "#86250f", "#3c3950"];

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

  // Line chart data
  const chartData = {
    labels: [
      "Disability",
      "Merit",
      "Need Equity",
      "Need Equity + Disability",
      "Need Equity + Merit",
      "STEM (Science)",
    ],
    datasets: [
      {
        label: "Number of Scholarships",
        data: [20, 19, 531, 1, 55, 2],
        backgroundColor: "rgba(232, 70, 30, 0.3)", // Transparent fill for a better visual
        borderColor: "#df6b4f",
        fill: true,
        tension: 0.4,
        pointHoverRadius: 8,
      },
    ],
  };

  // Pie chart data from JSON
  const labels = Object.keys(scholarshipData["Type of Scholarship"]);
  const values = Object.values(scholarshipData["Type of Scholarship"]);
  const pieData = {
    labels,
    datasets: [
      {
        label: "Scholarships",
        data: values,
        backgroundColor: COLORS,
        borderColor: COLORS.map((color) => color + "CC"),
        borderWidth: 1,
      },
    ],
  };

  // Shared options for responsiveness
  const responsiveOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#3c3950",
        bodyColor: "#3c3950",
        titleFont: { size: isMobile ? 12 : 14 },
        bodyFont: { size: isMobile ? 10 : 12 },
      },
    },
  };

  // Options for Line chart
  const lineChartOptions = {
    ...responsiveOptions,
    scales: {
      x: {
        title: {
          display: true,
          text: "Types of Scholarships", // Label for x-axis
          font: {
            size: 14,
            weight: "bold", // Make the font bold
          },
          color: "#e8461e",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Scholarships", // Label for y-axis
          font: {
            size: 14,
            weight: "bold", // Make the font bold
          },
          color: "#e8461e",
        },
      },
    },
    plugins: {
      ...responsiveOptions.plugins,
      legend: {
        display: false, // Hide legend only for Line chart
      },
    },
  };

  // Options for Pie chart
  const pieChartOptions = {
    ...responsiveOptions,
    plugins: {
      ...responsiveOptions.plugins,
      legend: {
        position: "top",
        labels: {
          font: { size: isMobile ? 10 : 14 },
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
    },
  };

  return (
    <div className="bg-[#dcdcdc] flex flex-col md:flex-row justify-evenly items-center gap-6 py-8 px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Line Chart Container */}
      <div className="w-full md:w-[45%] h-[70vh] bg-white shadow-2xl p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col items-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-center text-[#3c3950] mb-4">
          Categories of Scholarship
        </h2>
        <div className="w-full h-[55vh]">
          <Line data={chartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="w-full md:w-[45%] h-[70vh] max-xs:h-[75vh] bg-white shadow-2xl p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col items-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-center text-[#3c3950] mb-4">
          Scholarship Distribution by Type
        </h2>
        <div className="w-full h-[55vh]">
          <Pie data={pieData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DataChart1;
