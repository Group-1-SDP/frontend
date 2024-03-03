import React from "react";
import { motion } from "framer-motion";

interface ProfileBoxProps {
  username: string;
}

function ProfileBox({ username }: ProfileBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`p-4 m-4 rounded-md flex-grow flex items-center justify-between bg-green-600 hover:bg-green-700 text-white transition duration-300`}
    >
      <div className="">
        <p className={`font-semibold text-2xl`}>{username}</p>
      </div>
    </motion.div>
  );
}

export default ProfileBox;
