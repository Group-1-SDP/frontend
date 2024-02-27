import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { topTodoItem } from "../../App";

interface TimeState {
  time: number,
  seconds: number,
  minutes: number
}

function Bar() {
  const [topTodo] = useAtom(topTodoItem);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeState>({
    time: 5, 
    seconds: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      
      if (timeRemaining.time === 0) {
        clearInterval(timer);
      } else {
        setTimeRemaining(prevTime => ({
          time: prevTime.time - 1,
          minutes: Math.floor((prevTime.time - 1) / 60),
          seconds: (prevTime.time - 1) % 60
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-col items-center" ref={dropdownRef}>
      <motion.header
        initial={false}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex flex-col items-center h-16 w-[700px] rounded-xl m-5"
      >
        <motion.div
          className="h-6 w-[600px] rounded-xl m-5 flex z-[-1] justify-between"
          animate={{ backgroundColor: hovering || open ? "#333" : "#999" }}
        >
          <motion.div 
            className="w-[400px] bg-green-600 rounded-xl"
            initial={{ width: 0 }} 
            animate={{ width: `${(60 - timeRemaining.time / 60) * 100}%` }} 
            transition={{ duration: 1, type: "tween", ease: "linear" }} 
          />
          <div className="z-[-1] text-white">{timeRemaining.minutes}:{timeRemaining.seconds}</div>
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex justify-between py-4 px-2 mt-[-20px] rounded-xl w-[700px] bg-gray-300"
            animate={{ opacity: open ? 1 : 0 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <p className="pr-1">Current Task: </p>
              <span className="font-bold">{topTodo}</span>
            </div>
            <div className="flex items-center">
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StudyStreakBar() {
  return (
    <div className="flex justify-center">
      <Bar/>
    </div>
  );
}

export default StudyStreakBar;
