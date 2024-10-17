import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaLaptop, FaHandHoldingHeart, FaRupeeSign } from 'react-icons/fa';
import data from './Data.json'; // Import the JSON file

const CounterSection = () => {



const counters = [
    {
        icon: <FaMoneyBillWave />, // Represents cash flow and scholarships
        count: data.direct_cash_transfer_scholarships.number_disbursed,
        label: 'Direct Cash Transfer Scholarships Disbursed (2023-24)',
    },
    {
        icon: <FaLaptop />, // Represents digital devices for education
        count: data.digital_device_scholarships.number_awarded,
        label: 'Digital Device Scholarships Awarded (2023-24)',
    },
    {
        icon: <FaHandHoldingHeart />, // Represents financial aid and support
        count: data.direct_cash_transfer_scholarships.amount_disbursed_inr,
        label: 'Amount Disbursed via DCTs (INR)',
    },
    {
        icon: <FaRupeeSign />, // Represents investment and funding
        count: data.digital_device_scholarships.amount_invested_inr,
        label: 'Amount Invested in Digital Device Scholarships (INR)',
    },
];

  
  
  

  const [displayCounts, setDisplayCounts] = useState(Array(counters.length).fill(0));
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateCounters = () => {
    setHasAnimated(true);
    counters.forEach((counter, index) => {
      const duration = 2000; // Duration for counting animation in milliseconds
      const incrementTime = 100; // Time interval for each increment
      const totalSteps = duration / incrementTime;
      const incrementValue = Math.ceil(counter.count / totalSteps); // Increment each time

      let count = 0;
      const interval = setInterval(() => {
        if (count < counter.count) {
          count += incrementValue;
          if (count > counter.count) count = counter.count; // Prevent overflow
          setDisplayCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = count;
            return newCounts;
          });
        } else {
          clearInterval(interval);
        }
      }, incrementTime);
    });
  };

  useEffect(() => {
    if (!hasAnimated) {
      animateCounters(); // Trigger the counter animation on mount
    }
  }, [hasAnimated]); // The effect will run only once on mount

  return (
    <div className="flex flex-wrap justify-center p-5 md:p-10 bg-cover rounded-lg text-white backdrop-blur-sm">
      {counters.map((counter, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center flex-1 max-w-xs p-6 bg-white bg-opacity-10 rounded-lg hover:transform hover:-translate-y-2 hover:bg-opacity-20 transition-all duration-300 backdrop-blur-md mx-2 mb-8"
        >
          <div className="text-6xl text-pink-500 mb-4 flex items-center justify-center">
            {counter.icon}
          </div>
          <div className="text-4xl font-bold text-yellow-400 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-lg">
            {displayCounts[index]}+
          </div>
          <div className="text-lg text-white text-opacity-70 mt-2">
            {counter.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;
