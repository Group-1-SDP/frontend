import { atomWithStorage } from "jotai/utils";

//API link
export const APILink = "http://127.0.0.1:5000";

// Username storage
export const usernameAtom = atomWithStorage("username", "");

// Email storage
export const emailAtom = atomWithStorage("email", "");

// Navigation State
export const navigationSectionAtom = atomWithStorage("navState", "/");
