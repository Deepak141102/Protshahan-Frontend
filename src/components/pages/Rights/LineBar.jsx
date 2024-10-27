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
import { PieChart, Pie, Tooltip as RechartsTooltip, Cell, Legend as RechartsLegend } from "recharts";
import scholarshipData from './Data.json';

const COLORS = ['#e54c29', '#86250f', '#3c3950'];

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
    const formattedData = Object.entries(scholarshipData["Type of Scholarship"]).map(([name, value], index) => ({
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
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#3c3950",
        bodyColor: "#3c3950",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#3c3950",
        },
      },
      x: {
        ticks: {
          color: "#3c3950",
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-[#919191] to-[#3c3950] flex justify-evenly flex-col md:flex-row my-auto font-lato gap-4 items-center py-16">
      <div className="w-[45%] h-[76vh] max-md:w-11/12 bg-white shadow-2xl p-10 max-md:p-4 rounded-xl border border-[#65190b] flex flex-col items-center">
      <h2 className="text-xl font-bold text-center text-[#3c3950] mb-4">
          Categories of Scholarship
        </h2>
        <div className="w-full h-[50vh]">
          <Line data={chartData} options={lineOptions} />
        </div>
      </div>
      <div className="w-[45%] h-[76vh] max-md:w-11/12 bg-white shadow-2xl p-10 max-md:p-4 rounded-xl border border-[#65190b] flex flex-col items-center">
        <h2 className="text-xl font-bold text-center text-[#3c3950] mb-4">
          Scholarship Distribution
        </h2>
        <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius="80%"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <RechartsTooltip />
          <RechartsLegend />
        </PieChart>
      </div>
    </div>
  );
};

export default DataChart1;
