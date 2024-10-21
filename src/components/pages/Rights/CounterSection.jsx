import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaLaptop, FaHandHoldingHeart, FaRupeeSign } from 'react-icons/fa';
import data from './Data.json'; // Import the JSON file

const CounterSection = () => {
  const counters = [
    {
      icon: <FaMoneyBillWave />,
      count: data.direct_cash_transfer_scholarships.number_disbursed,
      label: 'Direct Cash Transfer Scholarships Disbursed (2023-24)',
    },
    {
      icon: <FaLaptop />,
      count: data.digital_device_scholarships.number_awarded,
      label: 'Digital Device Scholarships Awarded (2023-24)',
    },
    {
      icon: <FaHandHoldingHeart />,
      count: data.direct_cash_transfer_scholarships.amount_disbursed_inr,
      label: 'Amount Disbursed via DCTs (INR)',
    },
    {
      icon: <FaRupeeSign />,
      count: data.digital_device_scholarships.amount_invested_inr,
      label: 'Amount Invested in Digital Device Scholarships (INR)',
    },
  ];

  const [displayCounts, setDisplayCounts] = useState(Array(counters.length).fill('0'));
  const [hasAnimated, setHasAnimated] = useState(false);

  const shuffleDigits = (index, finalCount) => {
    const finalCountString = finalCount.toString();
    const shuffleDuration = 1500; // Shuffle effect duration in ms
    const shuffleIntervalTime = 50; // Interval for shuffling in ms
    const totalShuffles = shuffleDuration / shuffleIntervalTime;

    let currentShuffleStep = 0;
    const shuffleInterval = setInterval(() => {
      if (currentShuffleStep < totalShuffles) {
        const randomDigits = finalCountString
          .split('')
          .map(() => Math.floor(Math.random() * 10)) // Random digits for shuffle
          .join('');
        
        setDisplayCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = randomDigits;
          return newCounts;
        });

        currentShuffleStep++;
      } else {
        clearInterval(shuffleInterval);
        countToFinal(index, finalCountString);
      }
    }, shuffleIntervalTime);
  };

  const countToFinal = (index, finalCountString) => {
    const duration = 1500; // Total duration of the counting animation
    const incrementTime = 100; // Time between each count increment

    let currentStep = 0;
    const totalSteps = Math.ceil(duration / incrementTime);
    const finalDigits = finalCountString.split('');

    const countingInterval = setInterval(() => {
      if (currentStep < totalSteps) {
        const progress = finalDigits.map((digit, i) => {
          if (currentStep >= i * (totalSteps / finalDigits.length)) {
            return digit; // Show the correct digit after enough time
          }
          return Math.floor(Math.random() * 10); // Random digits until final
        }).join('');

        setDisplayCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = progress;
          return newCounts;
        });

        currentStep++;
      } else {
        clearInterval(countingInterval);
        setDisplayCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = finalCountString; // Final value after counting ends
          return newCounts;
        });
      }
    }, incrementTime);
  };

  const animateCounters = () => {
    setHasAnimated(true);
    counters.forEach((counter, index) => {
      shuffleDigits(index, counter.count);
    });
  };

  useEffect(() => {
    if (!hasAnimated) {
      animateCounters(); // Trigger the animation when the component is mounted
    }
  }, [hasAnimated]);

  return (
    <div className="flex flex-wrap justify-center p-5 md:p-10 bg-cover rounded-lg text-white font-lato">
      {counters.map((counter, index) => (
        <div
          key={index}
          className="group flex flex-col w-1/5 max-md:w-2/5 max-sm:w-full max-lg:w-2/5 items-center text-center p-6 bg-[#3c3950] rounded-lg hover:-translate-y-2 hover:bg-[#e54c29] 
            duration-300 backdrop-blur-md mx-2 mb-8 transition-all"
        >
          <div className="text-6xl text-[#e54c29] mb-4 flex items-center justify-center group-hover:text-[#212331] ">
            {counter.icon}
          </div>
          <div className="count text-4xl font-bold text-gradient bg-gradient-to-r to-[#525468] from-[#919191] bg-clip-text text-transparent filter drop-shadow-md">
            {displayCounts[index]}+
          </div>
          <div className="text-lg text-[#df6b4f] group-hover:text-white text-opacity-70 mt-2 ">
            {counter.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;
