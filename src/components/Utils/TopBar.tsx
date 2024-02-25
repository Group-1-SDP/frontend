import React from "react";
import { easeInOut, motion } from "framer-motion";
import UserMenu from "../mainPage/UserMenu";

function topBar() {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="items-center">
        <UserMenu />
      </div>
      <motion.div
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{
          // duration: 0.5,
          // ease: [0, 0.71, 0.2, 1.01],
          ease: "easeInOut",
        }}
        className="flex items-center px-8 py-10">
        <a href="/">
        <img
          src="src/assets/Tickbox Logo White Full.svg"
          alt="Logo"
          className="w-auto h-[60px]"
        />
        </a>
      </motion.div>
    </div>
  );
}

export default topBar;
