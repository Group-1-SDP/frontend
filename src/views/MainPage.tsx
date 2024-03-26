import Authenticated from "./Authenticated.tsx";
import { useAtom } from "jotai";
import { atom } from "jotai";
import { useEffect } from "react";
import { APILink, userIDAtom } from "../components/Utils/GlobalState.ts";

export const topTodoItem = atom("");

function MainPage() {
  return (
    <>
      <Authenticated />
    </>
  );
}

export default MainPage;
