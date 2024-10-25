import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import catalog from "./GovtLinkage.json"; // Ensure the path is correct

const GovtLinkage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [barThickness, setBarThickness] = useState(60); // Default bar thickness

  // Define your colors
  const colors = [
    "rgba(224, 70, 31, 1)", // Red
    "rgba(242, 92, 84, 1)", // Pink
    "rgba(134, 37, 15, 1)", // Brown
    "rgba(223, 107, 79, 1)", // Orange
    "rgba(101, 25, 11, 1)", // Dark Red
  ];

  useEffect(() => {
    const handleResize = () => {
      // Set bar thickness based on screen width
      if (window.innerWidth <= 768) {
        setBarThickness(15); // Thinner bars on smaller screens
      } else {
        setBarThickness(60); // Default thicker bars on larger screens
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getYearlyData = () => {
    const years = Object.keys(catalog);

    const totalCompensations = years.map((year) => {
      return catalog[year].reduce((total, entry) => {
        const grandTotal =
          entry.monetary_compensation_breakdown?.grand_total || 0; // Handle undefined
        return total + grandTotal;
      }, 0);
    });

    return {
      labels: years,
      datasets: [
        {
          label: "Total Compensation",
          data: totalCompensations,
          backgroundColor: colors.slice(0, years.length),
          hoverBackgroundColor: colors.slice(0, years.length),
          borderSkipped: false,
          barThickness: barThickness, // Use dynamic bar thickness
        },
      ],
    };
  };

  const getCategoryData = (year) => {
    const yearData = catalog[year];
    const categories = yearData.map((entry) => entry.category);
    const data = yearData.map(
      (entry) => entry.monetary_compensation_breakdown?.grand_total || 0
    );

    return {
      labels: categories,
      datasets: [
        {
          label: `Categories in ${year}`,
          data,
          backgroundColor: "rgba(134, 37, 15, 1)",
          hoverBackgroundColor: "rgba(134, 37, 15, 0.8)",
          borderSkipped: false,
          barThickness: barThickness, // Use dynamic bar thickness
        },
      ],
    };
  };

  const getMonthlyData = (year, category) => {
    const categoryData = catalog[year].find(
      (entry) => entry.category === category
    );
    if (!categoryData) return { labels: [], datasets: [] };

    return {
      labels: Object.keys(categoryData.monetary_compensation_breakdown).filter(
        (month) => month !== "grand_total"
      ),
      datasets: [
        {
          label: `Monthly Data for ${category} in ${year}`,
          data: Object.values(
            categoryData.monetary_compensation_breakdown
          ).filter((_, index) => index < 12),
          backgroundColor: "rgba(242, 92, 84, 1)",
          hoverBackgroundColor: "rgba(242, 92, 84, 0.8)",
          borderRadius: 10,
          borderSkipped: false,
          barThickness: barThickness, // Use dynamic bar thickness
        },
      ],
    };
  };

  const handleYearClick = (event, elements) => {
    if (elements.length > 0) {
      const yearIndex = elements[0].index;
      const year = Object.keys(catalog)[yearIndex];
      setSelectedYear(year);
    }
  };

  const handleCategoryClick = (event, elements) => {
    if (elements.length > 0) {
      const category = event.chart.data.labels[elements[0].index];
      setSelectedCategory(category);
    }
  };

  let chartData;
  let onClickHandler = null;
  let headingText = "";

  if (!selectedYear) {
    chartData = getYearlyData();
    onClickHandler = handleYearClick;
    headingText = "Click On a Bar To See Category Data!";
  } else if (!selectedCategory) {
    chartData = getCategoryData(selectedYear);
    onClickHandler = handleCategoryClick;
    headingText = "Click On a Bar To See Monthly Data!";
  } else {
    chartData = getMonthlyData(selectedYear, selectedCategory);
    headingText = "Visualise Monthly Data!";
  }

  return (
    <div className="container mx-auto p-4">
      {selectedYear && !selectedCategory && (
        <button
          className="relative top-0 left-1 p-2 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out flex justify-center items-center"
          onClick={() => {
            setSelectedYear(null);
            setSelectedCategory(null);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
        </button>
      )}
      {selectedCategory && (
        <button
          className="relative top-0 left-1 p-2 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out flex justify-center items-center"
          onClick={() => setSelectedCategory(null)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
        </button>
      )}
      <h1 className="text-2xl font-bold text-[#212331] text-center mb-4">
        Interactive Data Visualization
      </h1>
      <h2 className="text-2xl font-bold text-[#e0461f] text-center mb-4">
        {headingText}
      </h2>
      <div className="relative">
        <div className="w-full h-[50vh] max-md:h-[66vh] max-md:w-full m-auto">
          <Bar
            data={chartData}
            options={{
              onClick: onClickHandler,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GovtLinkage;
