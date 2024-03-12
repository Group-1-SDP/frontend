import { atomWithStorage } from "jotai/utils";

//API link
export const APILink = "http://10.124.196.98:5000";

// Username storage
export const usernameAtom = atomWithStorage("username", "");

// Email storage
export const emailAtom = atomWithStorage("email", "");

// Navigation State
export const navStateAtom = atomWithStorage("navState", window.location.pathname);
