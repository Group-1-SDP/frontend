import React from "react";
import TopBar from "../components/Utils/TopBar.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";

function Authenticated() {
  return (
    <div className="overflow-hidden">
      <TopBar />    
      <div className="flex justify-center">
        <ControlsMenu />
      </div>
      <StudyStreakBar />
    </div>
  );
}

export default Authenticated;