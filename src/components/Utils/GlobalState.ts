import { atom } from "jotai";

//API link
export const APILink = "http://127.0.0.1:5000";

//Username Global storage
const storedUsername = localStorage.getItem("username") || "";
export const usernameAtom = atom(storedUsername);

//Username Email storage
const storedEmail = localStorage.getItem("email") || "";
export const emailAtom = atom(storedEmail);

//Navigation State
const storedNavState = localStorage.getItem("navState") || "/";
export const navigationSectionAtom = atom(storedNavState);
