import { React, useState } from "react";
import { Pie, Radar, Bar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";

// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const GraphFirst = () => {
  console.log('GraphFirst is rendering...');

  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2023);

  const years = [2018, 2019, 2020, 2021, 2022, 2023];

  // Function to filter the chart data based on selected year range
  const filterDataByYearRange = (data) => {
    return data.filter(
      (item) => item.year >= startYear && item.year <= endYear
    );
  };

  // Sample chart data for demonstration, replace with actual data
  const rawData = {
    pieData: [
      { year: 2020, data: [31, 19, 16, 12, 10, 8, 5] },
      { year: 2021, data: [21, 25, 14, 10, 8, 6, 4] },
      { year: 2022, data: [18, 20, 16, 12, 10, 9, 7] },
      { year: 2023, data: [29, 15, 12, 8, 6, 5, 3] },
    ],
    radarData: [
      { year: 2020, data: [20, 12, 18, 14, 10] },
      { year: 2021, data: [25, 15, 10, 20, 15] },
      { year: 2022, data: [23, 18, 11, 17, 12] },
      { year: 2023, data: [28, 22, 15, 21, 18] },
    ],
    barData: [
      { year: 2020, data: [50, 75, 100, 125, 150] },
      { year: 2021, data: [55, 80, 110, 130, 160] },
      { year: 2022, data: [60, 85, 120, 140, 170] },
      { year: 2023, data: [65, 90, 130, 150, 180] },
    ],
    lineData: [
      { year: 2020, data: [15, 25, 35, 45, 55] },
      { year: 2021, data: [18, 30, 40, 50, 60] },
      { year: 2022, data: [20, 35, 45, 55, 65] },
      { year: 2023, data: [25, 40, 50, 60, 70] },
    ],
  };

  // Filter data for each graph based on selected years
  const filteredPieData = filterDataByYearRange(rawData.pieData).map(
    (item) => item.data
  );
  const filteredRadarData = filterDataByYearRange(rawData.radarData).map(
    (item) => item.data
  );
  const filteredBarData = filterDataByYearRange(rawData.barData).map(
    (item) => item.data
  );
  const filteredLineData = filterDataByYearRange(rawData.lineData).map(
    (item) => item.data
  );

  // Pie chart data
  const pieData = {
    labels: ["Delhi", "UP", "Bihar", "Kerala", "Punjab", "MP", "Goa"],
    datasets: [
      {
        label: "A breakdown of where the children are from",
        data: filteredPieData.length
          ? filteredPieData[0]
          : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#3a0088",
          "#ffed00",
          "#ff0077",
          "#00f9ff",
          "#ff8f00",
          "#007fff",
          "#ff0044",
        ],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  // Radar chart data
  const radarData = {
    labels: ["Delhi", "UP", "Bihar", "Kerala", "Punjab"],
    datasets: [
      {
        label: "Children Enrollment",
        data: filteredRadarData.length ? filteredRadarData[0] : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(0, 255, 255, 0.5)",
        borderColor: "#00ffcc",
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ["Delhi", "UP", "Bihar", "Kerala", "Punjab"],
    datasets: [
      {
        label: "Total Children Enrolled",
        data: filteredBarData.length ? filteredBarData[0] : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 0, 102, 0.7)",
        borderColor: "#ff0066",
        borderWidth: 2,
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ["Delhi", "UP", "Bihar", "Kerala", "Punjab"],
    datasets: [
      {
        label: "Monthly Enrollments",
        data: filteredLineData.length ? filteredLineData[0] : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(255, 255, 0, 0.4)",
        borderColor: "rgba(255, 255, 0, 1)",
        tension: 0.5,
      },
    ],
  };

  return (
    <div className=" bg-frameImg bg-no-repeat bg-fixed bg-cover bg-bottom">
      <div className=" bg-black bg-opacity-75 text-white py-8 px-12 max-md:p-0  ">
        {" "}
        <div className="flex text-4xl max-md:text-2xl mb-4">
        <h1 className="max-md:text-center max-md:text-2xl">
            <span className="text-yellow-400 pl-4">Protsahan</span>
            -For a Better Future | Data Visualization (map 1)
          </h1>
        </div>
        <div className="bg-black py-11 max-p-0 rounded-lg bg-opacity-60">
          <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
            <div className="flex justify-around flex-wrap">
              <div className="flex">
                <span className="text-yellow-300">Timeline:</span>
                <p>Child entering Protsahan</p>
              </div>
              <div className="flex flex-wrap max-md:flex-col max-md:m-auto">
                <p className="max-sm:text-center">
                  <span className="text-yellow-300">Potential Consumers:</span>{" "}
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4">
              <p>
                These set of data visualisations takes a deeper look into how
                Protsahan is empowering the children by providing them the
                necessary tools to come out of their traumatised lives and lead
                a normal lives.
              </p>
            </div>
          </div>

          {/* Start and End Year Filters */}
          <div className="flex justify-between items-center text-center mt-7  mx-6 flex-wrap max-md:flex-col max-md:m-0 ">
            <div className="ml-5 flex items-center text-white max-md:mb-5 max-md:mx-0">
              <FontAwesomeIcon icon={faFilter} className="mr-3" />
              <label className="max-md:text-2xl">Start Year:</label>
              <select
                className="ml-2 p-2 rounded-md border-none bg-[#131a48] text-[#fff] max-md:px-10 max-md:py-5 max-md:text-2xl"
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center text-white">
              <FontAwesomeIcon icon={faFilter} className=" mr-3 text-white" />
              <label className="max-md:text-2xl">End Year:</label>
              <select
                className="ml-2 p-2 rounded-md border-none bg-[#131a48] text-[#fff] max-md:px-10 max-md:py-5 max-md:text-2xl"
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Graphs - Flexbox with Responsive Grid */}
          <div className="flex flex-wrap justify-around items-center mt-2 gap-8 p-2 mb-6">
            {/* Pie Chart */}
            <div className="w-1/3 max-md:w-full  p-4">
              <h2 className="font-semibold text-white my-8 bg-slate-600 bg-opacity-20 rounded-md p-3">
                Breakdown of where the children are from
              </h2>
              <Pie data={pieData} />
            </div>

            {/* Radar Chart */}
            <div className="w-1/3 max-md:w-full p-4">
              <h2 className="font-semibold text-white my-8 bg-slate-600 bg-opacity-20 rounded-md p-3">
                Children Enrollment Analysis
              </h2>
              <Radar data={radarData} />
            </div>

            {/* Bar Chart */}
            <div className="w-1/3 max-md:w-full  p-4">
              <h2 className="font-semibold text-white my-8 bg-slate-600 bg-opacity-20 rounded-md p-3">
                Total Children Enrolled
              </h2>
              <Bar data={barData} />
            </div>

            {/* Line Chart */}
            <div className="w-1/3 max-md:w-full p-4">
              <h2 className="font-semibold text-white my-8 bg-slate-600 bg-opacity-20 rounded-md p-3">
                Monthly Enrollments
              </h2>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphFirst;
