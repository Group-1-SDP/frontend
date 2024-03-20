import React from "react";
import { motion } from "framer-motion";
import { User } from "./Leaderboard";

interface LeaderboardElementProps {
  user: User;
}

function LeaderboardElement({ user }: LeaderboardElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0.5,
      }}
      className={`p-4 m-4 rounded-md flex items-center justify-between ${
        user.currentUser
          ? "bg-green-600 hover:bg-green-700 text-white font-semibold"
          : "hover:bg-gray-100"
      }  transition duration-300`}
    >
      <div className="flex items-center">
        <p className={`mr-2`}>{user.username}</p>
      </div>
      <div className="flex items-center">
        <p className="">{user.points}</p>
      </div>
    </motion.div>
  );
}

export default LeaderboardElement;
