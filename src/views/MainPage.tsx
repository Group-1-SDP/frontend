import React, { useState } from "react";
import TopBar from "../components/Utils/TopBar.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import Authenticated from "./Authenticated.tsx";
import Authenticator from "./Authenticator.tsx";

function MainPage() {

  const [authenticated, setAuthenticated] = useState(true); // sample code, will be removed with GlobalState

  return (
    <>
      { authenticated ? <Authenticated/> : <Authenticator/> }
    </>
  );
}

export default MainPage;
