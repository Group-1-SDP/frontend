import React, { useState, useEffect, useRef } from "react";
import ControlMenuButton from "./ControlMenuButton";
import { motion } from "framer-motion";
import { RiAlarmFill, RiBarChartBoxFill, RiBallPenFill } from "react-icons/ri";
import ToDoControlComponent from "./ControlComponents/ToDoControlComponent";
import ProgressControlComponent from "./ControlComponents/ProgressControlComponent";
import SetTimerControlComponent from "./ControlComponents/SetTimerControlComponent";

function controlsMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState<number>(0);

  // handler to close menu when clicked outside the component
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

  // cycle through the different states that the menu can appear in 
  // different states are 0 - 3
  // 0 - no components are focused, basic list mode (default)
  // 1 - component 1 is focused, stacked over 2 and 3
  // 2 - component 2 is focused, stacked over 1 and 3
  // 3 - component 3 is focused, stacked over 1 and 2
  const handleClick = (x: number) => {
    
    setMenuState(x);
    
  };

  return (
    <div>
      <div className="items-center flex">
        <div className="justify-center flex flex-col w-[320px] h-[300px] mx-12">
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
              {/* Component 1 */}
              <div onClick={() => handleClick(1)} className="rounded-xl" ref={menuRef}>
                <ControlMenuButton
                  focused={menuState === 1}
                  defaultState={menuState === 0}
                  buttonName="See To-Do List"
                >
                  {[<RiBallPenFill/>, <ToDoControlComponent/>]}

                </ControlMenuButton>
              </div>
            </div>
            <div
              className={`flex flex-col justify-evenly items-center ${
                menuState === 2 ? "col-span-full" : ""
              }`}
              style={{ order: menuState === 2 ? -1 : 1 }}
              onClick={() => handleClick(2)}
            >
              {/* Component 2 */}
              <div onClick={() => handleClick(2)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 2}
                  defaultState={menuState === 0}
                  buttonName="Set Timer"
                >
                  {[<RiAlarmFill/>, <SetTimerControlComponent/>]}
                  
                </ControlMenuButton>
              </div>
            </div>
            <div
              className={` flex flex-col justify-evenly items-center ${
                menuState === 3 ? "col-span-full" : ""
              }`}
              style={{ order: menuState === 3 ? -1 : 1 }}
              onClick={() => handleClick(3)}
            >
              {/* Component 3 */}
              <div onClick={() => handleClick(3)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 3}
                  defaultState={menuState === 0}
                  buttonName="See Progress"
                >
                  {[<RiBarChartBoxFill/>, <ProgressControlComponent/>]}
                </ControlMenuButton>
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
