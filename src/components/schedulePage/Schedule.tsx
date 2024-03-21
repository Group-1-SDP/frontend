import { useEffect } from "react";
import ScheduleElement from "./ScheduleElement";
import { Event } from "./ScheduleWrapper";
import { useAnimate, stagger, motion } from "framer-motion";

// const staggerScheduleElements = stagger(0.1, { startDelay: 0.15 });

// function useScheduleAnimation() {
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     animate(
//       "li",
//       { opacity: 1, scale: 1, filter: "blur(0px)" },
//       { duration: 0.2, delay: staggerScheduleElements }
//     );
//   }, []);

//   return scope;
// }

interface ScheduleProps {
  events: Event[];
}

function Schedule({ events }: ScheduleProps) {
//   const scope = useScheduleAnimation();

  return (
    <div className="p-2 my-4 bg-white rounded-lg">
      {/* <ul>
        {events.map((event, index) => (
          <motion.li>
            <ScheduleElement key={index} event={event}></ScheduleElement>
          </motion.li>
        ))}
      </ul> */}
      {events.map((event, index) => (
        <ScheduleElement key={index} event={event}></ScheduleElement>
      ))}
    </div>
  );
}

export default Schedule;
