import React from "react";
import FamilyMembersChart from "./Chart1";
import ParentProfessionChart from "./Chart3";
import PersonConditionsHorizontalBarChart from "./PersonConditionChart";
import StateMap from "./StateMap";

const ArtPage = () => {
  return (
    <>
      <div className="bg-[#3c3950] min-h-screen font-lato">
        <div className="bg-[#212331] text-white py-8 px-4 sm:px-11">
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
                  These set of data visualisations paints a story of the
                  enrolment data of students on a specified date
                  range/month/year. It tells the user how many children have
                  enrolled in Protsahan, basic data related to the pool of
                  children, etc.
                </p>
              </div>
            </div>
            <div className="bg-[#dcdcdc] rounded-lg shadow-lg">
              <FamilyMembersChart />
              <ParentProfessionChart />
              {/* <PersonConditionsHorizontalBarChart /> */}
              <StateMap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtPage;
