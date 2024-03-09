import Authenticated from "./Authenticated.tsx";
import AuthenticatorPage from "./AuthenticatorPage.tsx";
import { useAtom } from "jotai";
import { authenticated } from "../App.tsx";
import { atom } from 'jotai';

export const topTodoItem = atom("");

function MainPage() {

  const [userAuthenticated] = useAtom(authenticated)

  return (
    <>
      { userAuthenticated ? <Authenticated/> : <AuthenticatorPage/> }
    </>
  );
}

export default MainPage;
