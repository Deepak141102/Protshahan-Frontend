import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import {
  PieChart,
  Pie,
  Tooltip as RechartsTooltip,
  Cell,
  Legend as RechartsLegend,
} from "recharts";
import scholarshipData from "./Data.json";

const COLORS = ["#e54c29", "#86250f", "#3c3950"];

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
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Chart data for line chart
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
        backgroundColor: "#e8461e",
        borderColor: "#df6b4f",
        fill: true,
        tension: 0.4,
        pointHoverRadius: 8,
      },
    ],
  };

  // Formatting data for pie chart
  useEffect(() => {
    const formattedData = Object.entries(
      scholarshipData["Type of Scholarship"]
    ).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }));
    setData(formattedData);
  }, []);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#3c3950",
          font: {
            size: isMobile ? 10 : 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#3c3950",
        bodyColor: "#3c3950",
        titleFont: {
          size: isMobile ? 12 : 14,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#3c3950",
          font: {
            size: isMobile ? 10 : 12,
          },
          padding: isMobile ? 6 : 10,
        },
      },
      x: {
        ticks: {
          color: "#3c3950",
          font: {
            size: isMobile ? 10 : 12,
          },
          padding: isMobile ? 6 : 10,
        },
      },
    },
  };

  // Custom Legend Component for rounded legends
  const renderCustomLegend = () => (
    <div className="flex flex-wrap justify-center">
      {data.map((entry, index) => (
        <div
          key={index}
          className="flex items-center m-2 text-sm"
          style={{ fontSize: isMobile ? "10px" : "12px", color: "#3c3950" }}
        >
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.fill }}
          />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-[#919191] to-[#3c3950] flex flex-col md:flex-row justify-center items-center gap-6 py-8 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="w-full md:w-[45%] h-[70vh] bg-white shadow-2xl p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col items-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-center text-[#3c3950] mb-4">
          Categories of Scholarship
        </h2>
        <div className="w-full h-[55vh]">
          <Line data={chartData} options={lineOptions} />
        </div>
      </div>
      <div className="w-full md:w-[45%] h-[70vh] max-xs:h-[75vh] bg-white shadow-2xl p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col items-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-center text-[#3c3950] mb-4">
          Scholarship Distribution
        </h2>
        <PieChart width={isMobile ? 450 : 380} height={isMobile ? 300 : 380}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={!isMobile} // Hide label lines on smaller screens
            label={
              !isMobile
                ? ({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                : null
            } // Conditional label rendering
            outerRadius="75%"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>

          <RechartsTooltip
            contentStyle={{
              fontSize: isMobile ? "10px" : "12px",
              color: "#3c3950",
              backgroundColor: "#ffffff",
            }}
            itemStyle={{ fontSize: isMobile ? "10px" : "12px" }}
          />
        </PieChart>
        {renderCustomLegend()}
      </div>
    </div>
  );
};

export default DataChart1;
