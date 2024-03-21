import React from "react";
import ScheduleElement from "./ScheduleElement";
import {Event} from "./ScheduleWrapper";

interface ScheduleProps {
  events: Event[];
}

function Schedule({ events }: ScheduleProps) {
  return (
    <div className="p-2 my-4 bg-white rounded-lg">
      {events.map((event, index) => (
        <ScheduleElement key={index} event={event}></ScheduleElement>
      ))}
    </div>
  );
}

export default Schedule;
