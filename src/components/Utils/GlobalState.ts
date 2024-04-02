import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
  
//API link
export const APILink = "https://obscure-invention-4x774xpv7fqxqx-5000.app.github.dev";

// Username storage
export const usernameAtom = atomWithStorage("username", "");
export const profilePicAtom = atomWithStorage("profilePic", "koala.jpg");

// ID storage
export const userIDAtom = atomWithStorage("id", "");

// Level Storage
export const levelAtom = atomWithStorage("level", 1);
export const currentXPAtom = atomWithStorage("currentXP", 0);

// study time storage
export const studyTimeDailyAtom = atomWithStorage("studyTimeDaily", 0);
export const studyTimeSessionAtom = atomWithStorage("studyTimeSession", 0);
export const studyGoalDailyAtom = atomWithStorage("studyGoalDaily", 0);
export const studyGoalSessionAtom = atomWithStorage("studyGoalSession", 0);
export const phoneInBoxAtom = atomWithStorage("phoneInBox", false);
export const lastPhoneInBoxAtom = atomWithStorage("lastPhoneInBox", "");
export const rewardAvailableAtom = atomWithStorage("rewardAvailable", false);


// Navigation State
export const navStateAtom = atomWithStorage("navState", window.location.pathname);

// Friend Added State
export const friendAddedAtom = atom(false);

