import React from "react";
import DayDropdown from "./DayDropdown";

interface DayProgressProps {
  day: string;
  hoursWorked?: number;
}

function DayProgress({ day, hoursWorked }: DayProgressProps) {
  return (
    <div className="flex flex-col items-center hover:scale-125 hover:font-bold transition-all">
      <div className="bg-black p-5 rounded-full w-5" />
      <p>{day}</p>
    </div>
  );
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function TotalToday() {
  return (
    <div className="text-center">
      <div>
        Your phone's been in the box for{" "}
        <span className="font-bold text-greenAccent">0</span> hours today. Let's
        get started.
      </div>
      <div className="py-4">Here's how you've been doing this week:</div>
      <div className="flex justify-center space-x-5">
        <DayProgress day="Mon" />
        <DayProgress day="Tue" />
        <DayProgress day="Wed" />
        <DayProgress day="Thur" />
        <DayProgress day="Fri" />
      </div>
      <div className="flex justify-center items-center">
        <DayDropdown />
      </div>
      <div></div>
    </div>
  );
}

export default TotalToday;
