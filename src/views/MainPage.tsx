import React, { useState } from "react";
import TopBar from "../components/Utils/TopBar.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import Authenticated from "./Authenticated.tsx";
import Authenticator from "./Authenticator.tsx";
import { useAtom } from "jotai";
import { authenticated } from "../App.tsx";
import { atom } from 'jotai';

export const topTodoItem = atom("");

function MainPage() {

  const [userAuthenticated] = useAtom(authenticated)

  return (
    <>
      { userAuthenticated ? <Authenticated/> : <Authenticator/> }
    </>
  );
}

export default MainPage;
