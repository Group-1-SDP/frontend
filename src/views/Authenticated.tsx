import React from "react";
import Navigation from "../components/Utils/Navigation/Navigation.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";

function Authenticated() {
  return (
    <div className="overflow-hidden">
      <Navigation/>
      <div className="flex justify-center">
        <ControlsMenu />
      </div>
      <StudyStreakBar />
    </div>
  );
}

export default Authenticated;
