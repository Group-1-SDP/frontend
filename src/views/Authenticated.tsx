import React from "react";
import TopBar from "../components/Utils/TopBar.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import MainContainer from "../components/mainPage/MainContainer.tsx";

function Authenticated() {
  return (
    <div className="flex justify-center overflow-hidden">
      <div className="w-[1440px] h-screen bg-gray-200">
        <div className="w-[1440px] h-[70px]" id="TopBar"></div>
        <div className="flex">
          <div className="w-[240px] h-screen bg-gray-400"></div>
          <div className="w-[1240px] h-screen px-[31px]">
            <h1 className="font-bold text-4xl pt-[30px]">
              Let's get to work, <span>Username</span>.
            </h1>
            <div className="pt-4">
              <MainContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticated;
