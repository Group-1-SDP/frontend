import React from "react";
import Navigation from "../components/Utils/Navigation/Navigation.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import MainContainer from "../components/mainPage/MainContainer.tsx";
import { usernameAtom } from "../components/Utils/GlobalState.ts";
import { useAtom } from "jotai";

function Authenticated() {

  const [username] = useAtom(usernameAtom);

  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className=" bg-gray-200 w-full">
        <h1 className="font-light text-4xl">
          Let's get to work, <span>{username}</span>.
        </h1>
        <div className="pt-4">
          <MainContainer />
        </div>
      </div>
    </div>
  );
}

export default Authenticated;
