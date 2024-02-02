import React from "react";
import { motion } from "framer-motion";

export interface ControlMenuButtonProps {
  focused: boolean;
  defaultState: boolean;
  buttonName: string;
}

function ControlMenuButton({
  focused,
  defaultState,
  buttonName,
}: ControlMenuButtonProps) {
  return (
    <div className="py-[10px] my-2">
      <motion.div
        layout
        initial={{ borderRadius: 10 }}
        className="flex mx-5 my-7 py-3 text-center items-center align-center  transition-colors rounded-xl"
        animate={{
          width: (focused || defaultState ? 200 : 50),
          height: focused ? 200 : 50,
        }}
      >
        <div
          className={`${!(focused || defaultState) && "flex justify-center"}`}
        >
          <div className="bg-black rounded-full p-5 mx-2"></div>
        </div>
        {(focused || defaultState) && (
          <div className="relative">
            <motion.h1
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay:0.2, duration: 0.5, ease: "easeOut"}}
              className=""
            >
              {buttonName}
            </motion.h1>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ControlMenuButton;
