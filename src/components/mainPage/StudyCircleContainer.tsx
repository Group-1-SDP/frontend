import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import { useAtom } from "jotai";
import React from "react";
import { studyGoalSessionAtom } from "../Utils/GlobalState";

function StudyCircleContainer() {

  const [studyGoalSession] = useAtom(studyGoalSessionAtom);

  function percentageToHHMM(percent: number) {
    // Calculate total minutes in 8 hours
    const totalMinutes = 8 * 60;
    
    // Calculate the minutes based on the percentage
    const minutes = Math.round(totalMinutes * (percent / 100));
    
    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    // Format the result as HH:MM
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    
    return `${formattedHours}hrs ${formattedMinutes}mins`;
}


  return (
    <div className="w-[400px] h-[420px] shadow-md rounded-2xl">
      <div className=" px-5">
        <h1 className="text-xl">Current Study Session:</h1>
        <div className="mt-[-30px]">

        <ActivityRings
          rings={[
            { filledPercentage: 1.5, color: "#046244" },
          ]}
        />
        </div>
        <div className=" flex justify-between">
        <div>
          <h1 className="text-xl font-bold">{percentageToHHMM(studyGoalSession)}</h1>
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
