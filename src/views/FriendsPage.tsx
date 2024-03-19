import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Leaderboard from "../components/friendsPage/Leaderboard";
import Navigation from "../components/Utils/Navigation/Navigation";
import FriendsContainer from "../components/friendsPage/FriendsContainer";
import FriendAdd from "../components/friendsPage/FriendAdd";
import { CgAdd } from "react-icons/cg";
import { atom, useAtom } from "jotai";
import { friendAddedAtom } from "../components/Utils/GlobalState";

function FriendsPage() {
  const [showFriendAdd, setShowFriendAdd] = useState(false);
  

  const handleFriendAdd = () => {
    setShowFriendAdd(!showFriendAdd);
  };

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="bg-gray-200 w-full">
        <div className="">
          <div className="flex rounded-xl justify-between space-x-3 transition-all duration-150 relative">
            <div className="inline-block">
              <button
                className="rounded-xl font-light transition-all duration-75 mx-[-16px] px-[16px] text-4xl relative z-10"
                onClick={handleFriendAdd}
              >
                Friends
              </button>
            </div>
            <div className="inline-block">
              <button
                className="rounded-xl font-medium py-2 bg-greenAccent mr-4 text-white transition-all duration-75 mx-[-16px] px-[16px] text-2xl relative z-10"
                onClick={handleFriendAdd}
              >
                Add Friends
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showFriendAdd && (
            <motion.div
              key="friendAdd"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FriendAdd />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="pt-4 flex justify-center"
        >
          <motion.div
          >
            <FriendsContainer />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default FriendsPage;
