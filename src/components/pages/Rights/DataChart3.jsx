import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement);

const DataChart1 = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scholarshipData = {
        labels: [
            'Disability Scholarship',
            'Merit Scholarship',
            'Need-Based Equity',
            'Need-Based Equity, Disability Scholarship',
            'Need-Based Equity, Merit Scholarship',
            'STEM Scholarship (Science Stream)',
        ],
        datasets: [
            {
                label: 'Number of Scholarships',
                data: [20, 19, 531, 1, 55, 2],
                backgroundColor: '#ce441a',
                borderColor: '#e8461e',
                borderWidth: 2,
                borderRadius: 10,
            },
        ],
    };

    const genderData = {
        labels: ['Female', 'Male'],
        datasets: [
            {
                label: 'Number of Scholarships Disbursed',
                data: [558, 79],
                backgroundColor: '#3c3950',
                borderColor: '#e8461e',
                borderWidth: 2,
                borderRadius: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: isMobile ? 'bottom' : 'top',
                labels: {
                    color: '#fff',
                    font: {
                        size: isMobile ? 10 : 12,
                    },
                },
            },
            title: {
                display: true,
                text: 'Scholarships Data',
                color: '#fff',
                font: {
                    size: isMobile ? 14 : 18,
                },
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
                ticks: {
                    color: '#fff',
                    font: {
                        size: isMobile ? 9 : 12,
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#fff',
                    font: {
                        size: isMobile ? 9 : 12,
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 2,
                borderColor: '#fff',
            },
        },
    };

    return (
        <div className="flex justify-center space-x-8 flex-col md:flex-row items-center">
            <div className="w-1/2 h-[50vh] max-md:w-full max-md:h-[50vh] mb-20">
                <h2 className="text-xl font-bold text-white text-center mb-4">Categories of Scholarship</h2>
                <Line data={scholarshipData} options={options} />
            </div>
            <div className="w-1/2 h-[50vh] max-md:w-full">
                <h2 className="text-xl font-bold text-white text-center mb-4">Number of Scholarships Disbursed by Gender</h2>
                <Bar data={genderData} options={options} />
            </div>
        </div>
    );
};

export default DataChart1;
