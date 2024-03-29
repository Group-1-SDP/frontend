import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { phoneConnectedState } from "../../App";
import { useAtom } from "jotai";

export interface ControlMenuButtonProps {
  focused: boolean;
  defaultState: boolean;
  buttonName: string;
  children: ReactNode[] | null;
}

function ControlMenuButton({
  focused,
  defaultState,
  buttonName,
  children,
}: ControlMenuButtonProps) {

  const [phoneConnected] = useAtom(phoneConnectedState);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout="position"
      animate={{
        width: 300,
        height: focused ? 200 : 100,
        backgroundColor: phoneConnected ? '#8bae9d' : '#d0ded7'
      }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-200 rounded-xl py-[10px] my-2 flex flex-col items-center ${
        focused && "border border-solid border-black text "
      }`}

      style={{cursor: "pointer", scale: isHovered ? 1.1 : 1}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`flex my-7 text-center justify-center transition-colors rounded-xl items-center`}
        layout="position"
      >
        <div className="items-center">
          <motion.div className="flex items-center" layout="position">
            <div className={`${"flex items-center justify-center"}`}>
              <div className="mr-2 text-3xl">{children && children[0]}</div>
            </div>
            <div className="flex justify-center">
              <motion.h1
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="justify-center"
                layout="position"
              >
                {buttonName}
              </motion.h1>
            </div>
          </motion.div>
          {focused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="py-10"
              layout="position"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className=""
                layout="position"
              >
                {children && children[1]}
              </motion.h1>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ControlMenuButton;
