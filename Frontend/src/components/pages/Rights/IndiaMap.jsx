import React, { useState, useEffect } from "react"; 
import DatamapsIndia from "react-datamaps-india";
import placeData from "../json/rights/Data.json"; 
import "./rightsPage.css";

const StateMap = () => {
  const [color, setColor] = useState('#ff5733'); // Initial color

  const placeDetails = placeData.place_details; // Use the place details from your JSON

  // Calculate the total count
  const totalCount = placeDetails.reduce((sum, { Count }) => sum + Count, 0);

  // Convert place data into the format required by DatamapsIndia
  const regionData = placeDetails.reduce((acc, { Native, Count }) => {
    acc[Native] = {
      value: Count, // Set the count as the value for the region
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

  useEffect(() => {
    // Querying the specific paths for hiding
    const pathsToHide = [
      'path[d="M303.503,322.443L303.795,322.758L303.848,323.758L304.246,324.441L303.848,326.255L303.371,326.623L302.814,325.677L302.575,324.836L301.939,324.389L301.753,323.416L302.071,322.863L302.496,322.863Z"]',
      'path[d="M124.169,287.87L123.374,287.551L122.95,286.993L123.188,286.594L124.063,287.073ZM103.695,282.336L103.112,282.336L102.688,281.244L103.165,280.87Z"]'
    ];

    pathsToHide.forEach(selector => {
      const specificPath = document.querySelector(selector);
      if (specificPath) {
        specificPath.style.display = 'none'; // Hide the specific path
      }
    });

    // Reset all paths with specific starting d attribute
    document.querySelectorAll('path[d^="M303"]').forEach(path => {
      path.style.fill = color;
      path.style.display = 'none';
    });
    
  }, [color]); // Only runs when color changes

  return (
    <>
      <div className="bg-[#dcdcdc] text-white font-lato shadow-xl pt-12">
        <div className="bg-gray-900 bg-opacity-80 w-1/2 m-auto max-md:w-full rounded-xl px-3 py-2 max-md:rounded-none">
          <h1 className="map-title">Where has the child's family migrated from?</h1>
        </div>
        <div className="w-[70vw] max-xs:w-[94vw] max-xs:h-[46vh] max-lg:w-[90vw] max-md:w-[72vh] max-sm:w-full h-[100vh] m-auto max-sm:h-screen max-2xl:h-[65vh]">
          <div className="relative max-lg:w-[80%] w-2/3 max-sm:w-[100%] h-[75vh] max-md:h-[54vw] md:h-[100vh] m-auto max-md:w-full rounded-xl">
            <DatamapsIndia
              regionData={regionData}
              hoverComponent={({ value }) => {
                const count = value.value; // Get the migration count
                const stateName = value.name; // Get the state name from your data
                
                // Find the place data for the region
                const placeInfo = placeDetails.find(place => place.Native === stateName);
                const percentage = ((count / totalCount) * 100).toFixed(2); // Calculate the percentage
                const message =
                  count > 0
                    ? `(${percentage}% of total 816) people migrated from ${placeInfo?.["Place Address"] || 'Unknown'} `
                    : `No data available for ${stateName}`;
                
                return (
                  <div className="tooltip flex max-md:w-screen">
                    <div className="inline">
                      {message}
                      <div className="tooltip-header inline">{stateName}</div>
                    </div>
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
                width: 380,
                color: "white",
              }}
              getFillColor={(region) => {
                const value = regionData[region]?.value || 0;
                return getGradientColor(value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StateMap;
