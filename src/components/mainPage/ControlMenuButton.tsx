import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <motion.div
      animate={{
        width: focused || defaultState ? 300 : 150,
        height: focused ? 200 : 100,
      }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-200 bg-gradient-to-tr from-greenAccent to-greenAccent rounded-xl py-[10px] my-2 flex flex-col items-center ${
        focused && "border border-solid border-black text "
      }`}
    >
      <motion.div
        layout
        initial={{ borderRadius: 10 }}
        className={`flex my-7 text-center justify-center transition-colors rounded-xl items-center
        `}
      >
        <div className="items-center">
          <div className="flex items-center">
            <div className={`${"flex items-center justify-center"}`}>
              <div className="mr-2 text-3xl">{children && children[0]}</div>
            </div>
            {(focused || defaultState) && (
              <AnimatePresence>
                <div className="flex justify-center">
                  <motion.h1
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="margin-auto justify-center"
                  >
                    {buttonName}
                  </motion.h1>
                </div>
              </AnimatePresence>
            )}
          </div>
          {focused && (
            <div className="py-10">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className=""
              >
                {children && children[1]}
              </motion.h1>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ControlMenuButton;
