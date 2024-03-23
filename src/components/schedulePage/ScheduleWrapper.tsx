import { useState } from "react";
import Schedule from "./Schedule";
import ScheduleForm from "./ScheduleForm";

export interface Event {
  name: string;
  slot: string;
  color: string;
}

const defaultEvents = [
  { name: "SDP", slot: "09:00", color: "project-1" },
  { name: "MLG", slot: "10:00", color: "project-2" },
  { name: "FNLP", slot: "11:00", color: "project-3" },
  { name: "Lunch", slot: "12:00", color: "break" },
  { name: "SDP", slot: "13:00", color: "project-1" },
];

function ScheduleWrapper() {
  const [events, setEvents] = useState<
    { name: string; slot: string; color: string }[]
  >(defaultEvents);

  const addEvent = (name: string, slot: string, color: string) => {
    setEvents([...events, {name: name, slot: slot, color: color}])
  };

  return (
    <div className="my-4">
      <ScheduleForm addEvent={addEvent} />
      <Schedule events={events} />
    </div>
  );
}

export default ScheduleWrapper;
