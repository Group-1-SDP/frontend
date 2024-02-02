import React from "react";
import TopBar from "../components/mainPage/TopBar.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";

function MainPage() {
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

export default MainPage;
