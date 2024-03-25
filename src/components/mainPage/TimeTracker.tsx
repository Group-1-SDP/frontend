import React from "react";
import { ActivityRings } from "@jonasdoesthings/react-activity-rings";

function TimeTracker() {
  return (
    <div className="min-w-[380px] h-[365px] shadow-sm bg-white rounded-xl">
      <h1 className="font-bold text-[22px] p-6">Current Time Today</h1>
      <div className="flex justify-center">
        <div className="mt-[-70px]">
          <ActivityRings
            rings={[{ filledPercentage: 0.9, color: "#046244" }]}
          />
        </div>
      </div>
      <div className="mt-[-40px] px-5 flex justify-between">
        <div>
          <h1 className="text-xl font-bold">4hr 35 mins</h1>
          <div className="flex items-center space-x-3">
            <div className="bg-greenAccent w-[15px] h-[15px] rounded-full"></div>
            <h2 className="text-[16px] font-semibold">Today</h2>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">1hr 20mins</h1>
          <div className="flex items-center space-x-3 justify-end">
            <h2 className="text-[16px] font-semibold">This week average</h2>
            <div className="bg-[#9BC0B4] w-[15px] h-[15px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;
