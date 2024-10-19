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
    <div className="flex flex-wrap justify-center p-5 md:p-10 bg-cover rounded-lg text-white font-lato">
      {counters.map((counter, index) => (
        <div
          key={index}
          className="flex flex-col w-1/5 max-md:w-2/5 max-sm:w-full max-lg:w-2/5 items-center text-center p-6 bg-white/10 rounded-lg hover:-translate-y-2 hover:bg-white/20 transition duration-300 backdrop-blur-md mx-2 mb-8"
          >
          <div className="text-6xl  text-[#e54c29] mb-4 flex items-center justify-center">
            {counter.icon}
          </div>
          <div className="count text-4xl font-bold text-gradient bg-gradient-to-r  to-[#212331] from-[#919191] bg-clip-text text-transparent filter drop-shadow-md">
            {displayCounts[index]}+
          </div>
          <div className="text-lg text-[#df6b4f] text-opacity-70 mt-2">
            {counter.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;
