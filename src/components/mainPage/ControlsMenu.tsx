import React, { useState, useEffect, useRef } from "react";
import ControlMenuButton from "./ControlMenuButton";
import Model from "../Utils/Model";
import { AnimatePresence, motion } from "framer-motion";
import { RiAlarmFill, RiBarChartBoxFill, RiBallPenFill } from "react-icons/ri";
import ToDoControlComponent from "./ControlComponents/ToDoControlComponent";
import ProgressControlComponent from "./ControlComponents/ProgressControlComponent";
import SetTimerControlComponent from "./ControlComponents/SetTimerControlComponent";

function controlsMenu() {
  const canvasRef = useRef(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState<number>(0);

  // handler to close menu when clicked outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
      <div className="justify-center items-center pl-8 flex">
        <div className="justify-center flex flex-col w-[320px] h-[300px] mx-12">
          <div ref={menuRef} className={`grid`}>
            <div
              className={`flex flex-col justify-evenly items-center`}
              onClick={() => handleClick(1)}
            >
              {/* Component 1 */}
              <div
                onClick={() => handleClick(1)}
                className="rounded-xl"
                ref={menuRef}
              >
                <ControlMenuButton
                  focused={menuState === 1}
                  defaultState={menuState === 0}
                  buttonName="See To-Do List"
                >
                  {[<RiBallPenFill />, <ToDoControlComponent />]}
                </ControlMenuButton>
              </div>
            </div>
            <div
              className={`flex flex-col justify-evenly items-center`}
              onClick={() => handleClick(2)}
            >
              {/* Component 2 */}
              <div onClick={() => handleClick(2)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 2}
                  defaultState={menuState === 0}
                  buttonName="Set Timer"
                >
                  {[<RiAlarmFill />, <SetTimerControlComponent />]}
                </ControlMenuButton>
              </div>
            </div>
            <div
              className={` flex flex-col justify-evenly items-center`}
              onClick={() => handleClick(3)}
            >
              {/* Component 3 */}
              <div onClick={() => handleClick(3)} className="rounded-xl">
                <ControlMenuButton
                  focused={menuState === 3}
                  defaultState={menuState === 0}
                  buttonName="See Progress"
                >
                  {[<RiBarChartBoxFill />, <ProgressControlComponent />]}
                </ControlMenuButton>
              </div>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="flex-shrink-0"></canvas>
        <Model
          canvasRef={canvasRef}
          width={960}
          height={540}
          zCamPosition={2.7}
          yCamPosition={1.5}
          FOV={75}
          rotateY={1.6}
        />
      </div>
    </div>
  );
}

export default controlsMenu;
