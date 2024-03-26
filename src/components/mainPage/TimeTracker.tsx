import React from "react";
import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import { studyGoalDailyAtom, studyTimeDailyAtom } from "../Utils/GlobalState";
import { useAtom } from "jotai";

function TimeTracker() {
  const [studyGoalDaily] = useAtom(studyGoalDailyAtom);
  const [studyTimeDaily] = useAtom(studyTimeDailyAtom);

  function percentageToHHMM(percent: number) {
    // Calculate total minutes in 8 hours
    const totalMinutes = 8 * 60;

    // Calculate the minutes based on the percentage
    const minutes = Math.round(totalMinutes * (percent / 100));

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Format the hours without leading zero if less than 10
    const formattedHours =
      hours < 10 ? String(hours) : String(hours).padStart(2, "0");

    // Format the minutes
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${formattedHours}hrs ${formattedMinutes}mins`;
  }

  function secondsToHHMM(d: number): string {
    const hours = Math.floor(d / 3600);
    const minutes = Math.floor((d % 3600) / 60);

    // Format the hours and minutes with leading zeros
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours} hrs ${formattedMinutes} mins`;
  }

  function minsToPercentage(seconds: number): number {
    const totalSecondsIn8Hours = 8 * 60;
    return (seconds / totalSecondsIn8Hours) * 100;
  }

  function ratioToPercentageOf8Hours(ratioA: number, ratioB: number): number {
    // Convert ratios to percentages
    const percentageA = ratioA * 100;
    const percentageB = ratioB * 100;

    // Calculate the ratio of percentages
    const ratioPercentage = percentageA / percentageB;

    // Calculate the percentage of 8 hours based on the ratio of percentages
    const percentageOf8Hours = ratioPercentage;

    return percentageOf8Hours;
  }

  return (
    <div className="min-w-[380px] h-[365px] shadow-sm bg-white rounded-xl">
      <h1 className="font-bold text-[22px] p-6">Current Time Today</h1>
      <div className="flex justify-center">
        <div className="mt-[-70px]">
          <ActivityRings
            rings={[
              {
                filledPercentage: ratioToPercentageOf8Hours(
                  minsToPercentage(studyTimeDaily),
                  studyGoalDaily
                ),
                color: "#046244",
              },
            ]}
          />
        </div>
      </div>
      <div className="mt-[-40px] px-5 flex justify-between">
        <div>
          <h1 className="text-xl font-bold">
            {percentageToHHMM(studyGoalDaily)}
          </h1>
          <div className="flex items-center space-x-3">
            <div className="bg-[#9BC0B4] w-[15px] h-[15px] rounded-full"></div>
            <h2 className="text-[16px] font-semibold">Today's Goal</h2>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">{studyTimeDaily}</h1>
          <div className="flex items-center space-x-3 justify-end">
            <h2 className="text-[16px] font-semibold">Today So Far</h2>
            <div className="bg-greenAccent w-[15px] h-[15px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;
