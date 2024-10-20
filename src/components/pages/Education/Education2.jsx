// src/components/pages/Education/Education2.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import studentData from './StudentPassOut.json'; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Ensure Font Awesome is installed

const Education2 = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [yearlyData, setYearlyData] = useState(true);

    // Define consistent colors for subjects using the provided color codes
    const colorMap = {
        'History': '#e0461f ', // Base color for History
        'Political Science': '#f25c54', // Base color for Political Science
        'Social Studies': '#86250f', // Base color for Social Studies
        'Mathematics': '#df6b4f', // Base color for Mathematics
        'Science': '#65190b', // You can specify or keep this color
    };

    const hoverColorMap = {
        'History': '#c0341b', // Darker color for History on hover
        'Political Science': '#b85b3e', // Darker color for Political Science on hover
        'Social Studies': '#c12c01', // Darker color for Social Studies on hover
        'Mathematics': '#c12c01', // Darker color for Mathematics on hover
        'Science': '#d63f4d', // Darker color for Science on hover
    };

    const getYearlyData = () => {
        const years = studentData.map(data => data.year);
        const subjects = [...new Set(studentData.flatMap(data => data.classwise.flatMap(cw => Object.keys(cw.subjectWise))))];

        const datasets = subjects.map(subject => ({
            label: subject,
            data: studentData.map(data => {
                const total = data.classwise.reduce((sum, cw) => sum + (cw.subjectWise[subject] || 0), 0);
                return total;
            }),
            backgroundColor: colorMap[subject] || '#dc2f02', // Default color if subject not found
        }));

        return {
            labels: years,
            datasets,
        };
    };

    const getClasswiseData = (subject) => {
        const classwise = studentData.flatMap(data => data.classwise.map(cw => ({ class: cw.class, value: cw.subjectWise[subject] || 0 })));

        const classLabels = [...new Set(classwise.map(cw => cw.class))];
        const classData = classLabels.map(cls => {
            return classwise.filter(cw => cw.class === cls).reduce((sum, cw) => sum + cw.value, 0);
        });

        return {
            labels: classLabels,
            datasets: [{
                label: subject,
                data: classData,
                backgroundColor: colorMap[subject] || '#dc2f02', // Default color if subject not found
            }],
        };
    };

    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const subject = event.chart.data.datasets[elements[0].datasetIndex].label;
            setSelectedSubject(subject);
            setYearlyData(false);
        }
    };

    const chartData = yearlyData ? getYearlyData() : getClasswiseData(selectedSubject);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Student Data Visualization</h1>
            <div className="relative">
                {/* Back Button Icon */}
                {!yearlyData && (
                    <button
                    className="absolute top-0 left-12 p-3 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out flex justify-center items-center"
                    onClick={() => {
                      setYearlyData(true);
                      setSelectedSubject(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
                  </button>
                )}
                <div className=" w-full">
                <Bar
                    data={chartData}
                    options={{
                        onClick: handleClick,
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                onClick: (e) => e.stopPropagation(), // Prevent default click behavior
                                labels: {
                                    boxWidth: 15,
                                    padding: 20,
                                    usePointStyle: true,
                                },
                            },
                        },
                    }}
                />
            </div>
            </div>
        </div>
    );
};

export default Education2;
