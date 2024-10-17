import React, { useState } from "react";
import DatamapsIndia from "react-datamaps-india";
import migrationData from "./Data.json";
import "./rightsPage.css";

const IndiaMap = () => {
  const [tooltipContent, setTooltipContent] = useState(
    "Hover any state to see data"
  );
  const migrationInfo = migrationData.migration_info;

  // Convert migration data into the format required by DatamapsIndia
  const regionData = Object.keys(migrationInfo).reduce((acc, state) => {
    acc[state] = {
      value: migrationInfo[state],
    };
    return acc;
  }, {});

  // Function to get gradient color based on the value
  const getGradientColor = (value) => {
    if (value > 800) return "linear-gradient(135deg, #FF0055, #FF0077)"; // Gradient for high values
    if (value > 600) return "linear-gradient(135deg, #FF9900, #FFCC00)"; // Gradient for medium-high
    if (value > 300) return "linear-gradient(135deg, #FFD700, #FFE84C)"; // Gradient for medium
    return "linear-gradient(135deg, #00FF00, #66FF66)"; // Gradient for low values
  };

  return (
  
          <div className="relative w-[55%] h-screen m-auto max-md:w-full"
            
          >
            <h1 className="map-title">Where has the child's family migrated from?</h1>
            <DatamapsIndia
              regionData={regionData}
              hoverComponent={({ value }) => {
                const count = value.value; // Get the migration count
                const stateName = value.name; // Get the state name from your data

                // Construct the message
                const message =
                  count > 0
                    ? `${count} people migrated from`
                    : `No data available for `;

                return (
                  <div className="tooltip flex">
                    <div className="inline">
                      {message}{" "}
                      <div className="tooltip-header inline">{stateName}</div>
                    </div>{" "}
                    {/* The message already includes the state name */}
                  </div>
                );
              }}
              mapLayout={{
                legendTitle: "Number of Migrants",
                startColor: "#919191", // Light gray for low values
                endColor: "#3c3950", // Dark purple for high values
                hoverTitle: "Count",
                noDataColor: "#f5f5f5", // Color for regions with no data
                borderColor: "#ce441a", // Orange-red border for regions
                hoverBorderColor: "#919191", // Gray border when hovered
                hoverColor: "#e8461e", // Orange color on hover
                height: 500,
                width: 350,
                color: "white",
              }}
              getFillColor={(region) => {
                const value = regionData[region]?.value || 0;
                return getGradientColor(value);
              }}
            />
          </div>
  );
};

export default IndiaMap;
