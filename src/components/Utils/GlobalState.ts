import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//API link
export const APILink = "http://127.0.0.1:5000";

// Username storage
export const usernameAtom = atomWithStorage("username", "");

// ID storage
export const userIDAtom = atomWithStorage("id", "");

// Navigation State
export const navStateAtom = atomWithStorage("navState", window.location.pathname);

// Friend Added State
export const friendAddedAtom = atom(false);
