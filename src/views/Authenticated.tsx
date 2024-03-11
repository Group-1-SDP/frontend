import React from "react";
import Navigation from "../components/Utils/Navigation/Navigation.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import MainContainer from "../components/mainPage/MainContainer.tsx";

function Authenticated() {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className=" bg-gray-200">
        <Navigation paddingLeft={8} />
        <div className="w-[1240px] px-[31px] ml-[240px]">
          <h1 className="font-bold text-4xl pt-[30px]">
            Let's get to work, <span>Username</span>.
          </h1>
          <div className="pt-4">
            <MainContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticated;
