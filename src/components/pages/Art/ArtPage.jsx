import React from "react";
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
import data from "./art.json";

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GirlParticipantsChart = () => {
  // The JSON data you provided

  // Extract the activity names and participant counts from the JSON data
  const activityNames = data.girl_participants.activities.map(
    (activity) => activity.name
  );
  const participantCounts = data.girl_participants.activities.map(
    (activity) => activity.count
  );

  // Prepare chart data
  const chartData = {
    labels: activityNames, // Activity names as labels
    datasets: [
      {
        label: "Number of Participants", // Dataset label
        data: participantCounts, // Data for the bars
        backgroundColor: "#982722",
       
      },
    ],
  };

  // Chart options for customization (optional)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Activities",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 110,

        ticks: {
          callback: (value) => `${value}`,
          color: "rgba(33, 35, 49, 0.7)",
        },
        title: {
          display: true,
          text: "Female applicants Number",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };
  // count of activity sessions
  const activities = data.girl_participants.activities.map(
    (activity) => activity.name
  );
  const sessions = data.girl_participants.activities.map(
    (activity) => activity.count
  );
  const sessionCounts = data.sessions.activities_session.map(
    (activity) => activity.count
  );

  // Prepare chart data
  const sessionData = {
    labels: activities, // Activity names as labels
    datasets: [
      {
        label: "Number of Sessions", // Dataset for sessions
        data: sessionCounts, // Data for the bars
        backgroundColor: "#3d1512",
        
      },
    ],
  };

  // Chart options for customization (optional)
  const sessionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3c3950",
        },
        title: {
          display: true,
          text: "Activities",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(33, 35, 49, 0.7)",
        },
        title: {
          display: true,
          text: "Number of Sessions Conducted",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  return (
    <>
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-4 max-md:px-0 ">
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
              <p>
                These set of data visualisations paints a story of the enrolment
                data of students on a specified date range/month/year. It tells
                the user how many children have enrolled in Protsahan, basic
                data related to the pool of children, etc.
              </p>
            </div>
          </div>

      <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
            Girl Participation Statistics in Arts and Activities
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            <Bar data={chartData} options={options} />
          </div>
        </div>
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
            Number of Sessions Conducted by us
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            <Bar data={sessionData} options={sessionOptions} />
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default GirlParticipantsChart;
