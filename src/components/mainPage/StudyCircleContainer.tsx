import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import React from "react";

function StudyCircleContainer() {
  return (
    <div className="w-[400px] h-[420px] shadow-md rounded-2xl">
      <div className="px-10 py-5">
        <h1 className="font-bold text-xl">Current Session</h1>
        <div className="mt-[-30px]">

        <ActivityRings
          rings={[
            { filledPercentage: 1, color: "#046244" },
            { filledPercentage: 0.5, color: "#046244" },
          ]}
        />
        </div>
        <div className="m-[-20px] flex justify-between">
        <div>
          <h1 className="text-xl font-bold">4hr 35 mins</h1>
          <div className="flex items-center space-x-3">
            <div className="bg-greenAccent w-[15px] h-[15px] rounded-full"></div>
            <h2 className="text-[16px] font-semibold">This week</h2>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">1hr 20mins</h1>
          <div className="flex items-center space-x-3 justify-end">
            <h2 className="text-[16px] font-semibold">Today</h2>
            <div className="bg-green-500 w-[15px] h-[15px] rounded-full"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default StudyCircleContainer;
