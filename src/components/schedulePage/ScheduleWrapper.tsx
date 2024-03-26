import { useState, useEffect } from "react";
import Schedule from "./Schedule";
import ScheduleForm from "./ScheduleForm";

export interface Event {
  name: string;
  slot: string;
  color: string;
}

const defaultEvents = [
  { name: "SDP", slot: "09:00", color: "project-1" },
  { name: "MLG", slot: "11:00", color: "project-2" },
  { name: "Lunch", slot: "12:00", color: "break" },
  { name: "SDP", slot: "14:00", color: "project-1" },
];

function ScheduleWrapper() {
  const [events, setEvents] = useState<
    { name: string; slot: string; color: string }[]
  >(defaultEvents);

  // Function to compare two events by their slot times
  const compareEvents = (event1: Event, event2: Event) => {
    if (event1.slot < event2.slot) {
      return -1;
    }
    if (event1.slot > event2.slot) {
      return 1;
    }
    return 0;
  };

  // Effect to sort events whenever events state changes
  useEffect(() => {
    const sortedEvents = [...events].sort(compareEvents);
    setEvents(sortedEvents);
  }, [events]);

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
