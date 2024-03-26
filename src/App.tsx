import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { APILink, studyTimeDailyAtom, userIDAtom } from "./components/Utils/GlobalState";
import AuthenticatorPage from "./views/AuthenticatorPage";
import Authenticated from "./views/Authenticated";
import Navigation from "./components/Utils/Navigation/Navigation";
import { AnimatePresence } from "framer-motion";
import { TodoList } from "./views/TodoList";
import FriendsPage from "./views/FriendsPage";
import ProfilePage from "./views/ProfilePage";
import ModulesPage from "./components/Modules/ModulesPage";
import SchedulePage from "./views/SchedulePage";
import SettingsPage from "./views/SettingsPage";
import LeaderboardPage from "./views/LeaderboardPage";

export const authenticated = atomWithStorage("userAuth", false);
export const phoneConnectedState = atomWithStorage(
  "phoneConnectedState",
  false
);
export const phoneConnectedTime = atomWithStorage("phoneConnectedTime", "");


function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setSocketConnected] = useState(false);
  const [, setPhoneConnected] = useAtom(phoneConnectedState);
  const [phoneBoxTime, setPhoneBoxTime] = useAtom(phoneConnectedTime);
  const [userID] = useAtom(userIDAtom);
  const [studyTimeDaily, setStudyTimeDaily] = useAtom(studyTimeDailyAtom);
  const [studyTimeSession, setStudyTimeSession] = useAtom(studyTimeDailyAtom);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(APILink);
    setSocket(socketRef.current);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleConnect = () => {
      console.log("connected");
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      console.log("disconnected!");
      setSocketConnected(false);
    };

    const handlePhoneConnected = () => {
      console.log("phoneConnected!");
      setPhoneConnected(true);
      const current_date: Date = new Date();
      const formatted_date: string = current_date.toLocaleString();
      setPhoneBoxTime(formatted_date);
      phoneConnectedAPI();
    };

    const handlePhoneDisconnected = () => {
      console.log("phoneDisconnected!");
      setPhoneConnected(false);
      phoneDisconnectedAPI();
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("phoneConnected", handlePhoneConnected);
    socket.on("phoneDisconnected", handlePhoneDisconnected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("phoneConnected", handlePhoneConnected);
      socket.off("phoneDisconnected", handlePhoneDisconnected);
    };
  }, [setPhoneConnected, setPhoneBoxTime, userID]);

  const phoneConnectedAPI = async () => {
    if (userID === "") {
      return;
    }
    try {
      const response = await fetch(
        APILink + "/api/" + userID + "/phone-connected",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status !== 200) {
        console.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const phoneDisconnectedAPI = async () => {
    if (userID === "") {
      return;
    }
    try {
      const response = await fetch(
        APILink + "/api/" + userID + "/phone-disconnected",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time_studied: studyTimeDaily,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        console.log(studyTimeSession)
        setStudyTimeDaily(studyTimeDaily + studyTimeSession);
        setStudyTimeSession(0);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [userAuthenticated] = useAtom(authenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [userAuthenticated]);

  if (loading) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      {userAuthenticated ? (
        <div className="flex justify-center overflow-x-hidden">
          <div className="bg-gray-200 w-full min-h-screen px-[40px]">
            <Navigation />
            <div className="ml-[240px] pt-[30px]">
              <AnimatePresence>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Authenticated />} />
                    {/* Your other routes */}
                    <Route path="todo" element={<TodoList />} />
                    <Route path="friends" element={<FriendsPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="modules" element={<ModulesPage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                  </Routes>
                </BrowserRouter>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center ">
          <AuthenticatorPage />
        </div>
      )}
    </div>
  );
}

export default App;
