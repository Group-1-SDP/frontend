import React, { useState, useEffect, useRef } from "react";
import ControlMenuButton from "./ControlMenuButton";
import { motion } from "framer-motion";

function controlsMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState<number>(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        console.log("click");
        setMenuState(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleClick = (x: number) => {
    if (menuState === x) {
      setMenuState(0);
    } else {
      setMenuState(x);
    }
  };

  return (
    <div>
      <div className="px-[250px] items-center flex">
        <div className="w-[350px] h-[400px]">
          <div
            ref={menuRef}
            className={`grid ${
              menuState === 0 ? "grid-rows-2" : "grid-rows-1"
            } ${menuState === 0 ? "grid-cols-" : "grid-cols-2"}`}
          >
            <div
              className={`flex flex-col justify-evenly items-center ${
                menuState === 1 ? "col-span-full" : ""
              }`}
              style={{ order: menuState === 1 ? -1 : 1 }}
              onClick={() => handleClick(1)}
            >
              {/* Top Component */}
              <div onClick={() => handleClick(1)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 1}
                  defaultState={menuState === 0}
                  buttonName="See To-Do List"
                />
              </div>
            </div>
            <div
              className={`flex flex-col justify-evenly items-center ${
                menuState === 2 ? "col-span-full" : ""
              }`}
              style={{ order: menuState === 2 ? -1 : 1 }}
              onClick={() => handleClick(2)}
            >
              {/* Bottom Left Component */}
              <div onClick={() => handleClick(2)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 2}
                  defaultState={menuState === 0}
                  buttonName="Set Timer"
                />
              </div>
            </div>
            <div
              className={` flex flex-col justify-evenly items-center ${
                menuState === 3 ? "col-span-full" : ""
              }`}
              style={{ order: menuState === 3 ? -1 : 1 }}
              onClick={() => handleClick(3)}
            >
              {/* Bottom Right Component */}
              <div onClick={() => handleClick(3)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 3}
                  defaultState={menuState === 0}
                  buttonName="See Progress"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 ">
          <img src="https://placehold.co/600x400"></img>
        </div>
      </div>
    </div>
  );
}

export default controlsMenu;
