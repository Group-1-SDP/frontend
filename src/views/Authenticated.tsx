import React, { useEffect } from "react";
import Navigation from "../components/Utils/Navigation/Navigation.tsx";
import ControlsMenu from "../components/mainPage/ControlsMenu.tsx";
import StudyStreakBar from "../components/mainPage/StudyStreakBar.tsx";
import MainContainer from "../components/mainPage/MainContainer.tsx";
import {
  APILink,
  currentXPAtom,
  levelAtom,
  profilePicAtom,
  studyGoalDailyAtom,
  studyGoalSessionAtom,
  studyTimeAtom,
  userIDAtom,
  usernameAtom,
} from "../components/Utils/GlobalState.ts";
import { useAtom } from "jotai";
import { motion } from "framer-motion";

function Authenticated() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [profilePic, setProfilePic] = useAtom(profilePicAtom);
  const [level, setLevel] = useAtom(levelAtom);
  const [currentXP, setCurrentXP] = useAtom(currentXPAtom);
  const [studyTime, setStudyTime] = useAtom(studyTimeAtom);
  const [studyGoalDaily, setStudyGoalDaily] = useAtom(studyGoalDailyAtom);
  const [studyGoalSession, setStudyGoalSession] = useAtom(studyGoalSessionAtom);
  const [userID] = useAtom(userIDAtom);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await fetch(
          APILink + "/api/" + userID + "/information",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          // Handle success
          setUsername(data.username);
          setStudyTime(data.study_hours_today);
          setProfilePic(data.profile_picture);
          setLevel(data.level);
          setCurrentXP(data.current_xp);
          setStudyGoalDaily(data.study_goal_daily);
          setStudyGoalSession(data.study_goal_session);
        } else {
          // Handle error
          console.error(data.message); // Log the error message
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchUserInformation();
  }, [userID]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center overflow-x-hidden"
    >
      <div className=" bg-gray-200 w-full">
        <h1 className="font-light text-4xl">
          Let's get to work, <span>{username}</span>.
        </h1>
        <div className="pt-4">
          <MainContainer />
        </div>
      </div>
    </motion.div>
  );
}

export default Authenticated;
