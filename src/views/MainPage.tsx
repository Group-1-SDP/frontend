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
