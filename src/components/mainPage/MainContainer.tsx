import React, { useRef } from "react";
import StudyCircle from "../Utils/StudyCircle";
import StudyCircleContainer from "./StudyCircleContainer";
import Model from "../Utils/Model";
import TimeTracker from "./TimeTracker";
import TodoTracker from "./TodoTracker";
import ProgressTracker from "./ProgressTracker";

function MainContainer() {
  const canvasRef = useRef(null);

  return (
    <div className="flex flex-col">
      <div className="flex w-[1140px] h-[480px] bg-white rounded-2xl justify-between">
        <div className="flex items-center pl-[31px]">
          <StudyCircleContainer />
        </div>
        <div className="mt-[20px] ml-[-40px]">
          <canvas ref={canvasRef}></canvas>
          <Model canvasRef={canvasRef} width={705} height={450} zCamPosition={4} yCamPosition={2.7} FOV={55}/>
        </div>
      </div>
      <div className="flex w-[1140px] h-[405px] rounded-2xl items-center justify-between">
        <TimeTracker />
        <TodoTracker />
        <ProgressTracker />
      </div>
    </div>
  );
}

export default MainContainer;
