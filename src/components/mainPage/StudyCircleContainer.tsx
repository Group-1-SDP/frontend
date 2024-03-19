import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import React from "react";

function StudyCircleContainer() {
  return (
    <div className="w-[400px] h-[420px] shadow-md rounded-2xl">
      <div className=" px-5">
        <h1 className="text-xl">Current Study Session:</h1>
        <div className="mt-[-30px]">

        <ActivityRings
          rings={[
            { filledPercentage: 1, color: "#046244" },
            { filledPercentage: 0.5, color: "#046244" },
          ]}
        />
        </div>
        <div className=" flex justify-between">
        <div>
          <h1 className="text-xl font-bold">4hrs 0mins</h1>
          <div className="flex items-center space-x-1">
            <div className="bg-[#9BC0B4] w-[15px] h-[15px] rounded-full"></div>
            <h2 className="text-[16px]">Goal</h2>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">1hr 20mins</h1>
          <div className="flex items-center space-x-1 justify-end">
            <h2 className="text-[16px]">This session</h2>
            <div className="bg-greenAccent w-[15px] h-[15px] rounded-full"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default StudyCircleContainer;
