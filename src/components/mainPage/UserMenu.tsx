import React, { useEffect, useState, useRef } from "react";
import { MotionProps, Variants } from "framer-motion";

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },
  transition: { opacity: { duration: 0.2 } },
} satisfies MotionProps;

function UserMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, open]);


  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center hover:bg-gray-200 transition-colors font-semibold text-xl px-4 py-2 mx-3 rounded-xl"
        onClick={() => setOpen(!open)}
      >
        <div className="p-5 mr-2 rounded-full bg-black"></div>
        <h1>Hello, user!</h1>
      </div>
      {open && (
        <div
          className="px-4 mx-3 py-2 my-2 space-y-4 rounded-xl font-semibold text-xl absolute bg-gray-200"
          ref={dropdownRef}
        >
          <ul>
            <li className="px-3 rounded-full bg-gray-300 hover:bg-gray-400">
              Add Friends
            </li>
            <li className="px-3 rounded-full bg-gray-300 hover:bg-gray-400">
              Add module
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
