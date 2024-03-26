import React, { useRef } from "react";
import StudyCircle from "../Utils/StudyCircle";
import StudyCircleContainer from "./StudyCircleContainer";
import Model from "../Utils/Model";
import TimeTracker from "./TimeTracker";
import TodoTracker from "./TodoTracker";
import ProgressTracker from "./ProgressTracker";
import { motion } from "framer-motion";
import GameWithFriends from "./GameStuff/GameWithFriends";

function MainContainer() {
  const canvasRef = useRef(null);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex h-[480px] bg-white rounded-2xl justify-between px-[25px]">
        <div className="flex items-center">
          <StudyCircleContainer />
        </div>
        <div className="mt-[20px]">
          <canvas ref={canvasRef} className=""></canvas>
          <Model
            canvasRef={canvasRef}
            width={1230}
            height={450}
            zCamPosition={4}
            yCamPosition={3.1}
            FOV={40}
            rotateY={-2.3}
          />
        </div>
      </div>
      <motion.div
        className="flex h-[405px] rounded-2xl items-center justify-between overflow-x-scroll space-x-[25px] "
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
          hidden: { opacity: 0 },
        }}
      >
        <TimeTracker />
        <GameWithFriends />
        <TodoTracker />
        <ProgressTracker />
      </motion.div>
    </div>
  );
}

export default MainContainer;
