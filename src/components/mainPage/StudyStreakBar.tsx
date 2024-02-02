import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

function TickBox() {
  return <div className="bg-black rounded-full p-5 mx-2"></div>;
}

function Bar() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {});

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
          className="h-6 w-[600px] rounded-xl m-5"
          animate={{ backgroundColor: hovering || open ? "#333" : "#999" }}
        />
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
              <p className="pr-1">Currently working on: </p>
              <span className="font-bold">Read Chapter 4</span>
              <TickBox />
            </div>
            <div className="flex items-center">
              <p className="px-1">Time Left:</p>
              <span className="font-bold">2 hours</span>
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
      <Bar></Bar>
    </div>
  );
}

export default StudyStreakBar;
