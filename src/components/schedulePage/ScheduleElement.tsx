import React from "react";
import { Event } from "./ScheduleWrapper";

interface ScheduleElementProps {
  event: Event;
}

function ScheduleElement({ event }: ScheduleElementProps) {
  return (
    <div className="p-2 flex rounded-lg items-center justify-between bg-white hover:bg-gray-100 transition duration-300">
      <div className="flex items-center">
        <div className="mr-2 rounded-full bg-red-600 h-10 w-2"></div>
        <p className="font-bold">
          {event.name}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p>
          {event.slot}
        </p>
        <p>End Time</p>
      </div>
    </div>
  );
}

export default ScheduleElement;
