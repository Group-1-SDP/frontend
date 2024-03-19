import React, { useRef } from "react";
import StudyCircle from "../Utils/StudyCircle";
import StudyCircleContainer from "./StudyCircleContainer";
import Model from "../Utils/Model";
import TimeTracker from "./TimeTracker";
import TodoTracker from "./TodoTracker";
import ProgressTracker from "./ProgressTracker";
import { motion } from "framer-motion";

function MainContainer() {
  const canvasRef = useRef(null);

  return (
    <div className="flex flex-col">
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
            FOV={45}
            mirror={false}
            rotateY={-2.3}
          />
        </div>
      </div>
      <motion.div
        className="flex w-full h-[405px] rounded-2xl items-center justify-between"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
          hidden: { opacity: 0 },
        }}
      >
        <TimeTracker />
        <TimeTracker />
        <TodoTracker />
        <ProgressTracker />
      </motion.div>
    </div>
  );
}

export default MainContainer;
