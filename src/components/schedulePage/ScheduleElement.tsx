import React from "react";
import { Event } from "./ScheduleWrapper";

const colourMap = {
  "project-1": "greenAccent",
  "project-2": "yellowAccent",
  "project-3": "blueAccent",
  "project-4": "redAccent",
  "project-5": "blackAccent",
  "break": "greyAccent"
};

function getTimeOneHourLater(inputTime: string): string {
  // Split the input time string into hours and minutes
  const [hours, minutes] = inputTime.split(':').map(Number);

  // Calculate the new time
  let newHours = hours + 1;
  let newMinutes = minutes;

  // Handle cases where the hour exceeds 23
  if (newHours > 23) {
    newHours = 0;
  }

  // Format the new time back into the desired format
  const formattedHours = newHours.toString().padStart(2, '0');
  const formattedMinutes = newMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}


interface ScheduleElementProps {
  event: Event;
}

function ScheduleElement({ event }: ScheduleElementProps) {

  // Type assertion to inform TypeScript that event.color will always be a key of colourMap
  const colour = colourMap[event.color as keyof typeof colourMap];

  console.log(colour);

  return (
    <div className="p-2 flex rounded-lg items-center justify-between bg-white hover:bg-gray-100 transition duration-300">
      <div className="flex items-center">
        <div className={`mr-2 rounded-full bg-${colour} h-10 w-2`}></div>
        <p className="font-bold">
          {event.name}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p>
          {event.slot}
        </p>
        <p className="text-gray-400">
          {getTimeOneHourLater(event.slot)}
        </p>
      </div>
    </div>
  );
}

export default ScheduleElement;
