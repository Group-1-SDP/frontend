// Existing imports...
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

import { atomWithStorage } from "jotai/utils";
import MainPage from "./views/MainPage";
import { TodoList } from "./views/TodoList";
import FriendsPage from "./views/FriendsPage";
import ProfilePage from "./views/ProfilePage";
import ModulesPage from "./components/Modules/ModulesPage";
import SettingsPage from "./views/SettingsPage";
import { useAtom } from "jotai";
import { APILink } from "./components/Utils/GlobalState";
import AuthenticatorPage from "./views/AuthenticatorPage";
import Authenticated from "./views/Authenticated";
import Navigation from "./components/Utils/Navigation/Navigation";
import SchedulePage from "./views/SchedulePage";
import LeaderboardPage from "./views/LeaderboardPage";
import { AnimatePresence } from "framer-motion";

export const topTodoItem = atomWithStorage("topTodo", "");
export const authenticated = atomWithStorage("userAuth", false);
export const phoneConnectedState = atomWithStorage(
  "phoneConnectedState",
  false
);
export const phoneConnectedTime = atomWithStorage("phoneConnectedTime", ""); // Changed atom name

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setSocketConnected] = useState(false);
  const [, setPhoneConnected] = useAtom(phoneConnectedState);
  const [, setBoxTime] = useAtom(phoneConnectedTime);

  useEffect(() => {
    const newSocket = io(APILink);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
        setSocketConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("disconnected!");
        setSocketConnected(false);
      });

      socket.on("phoneConnected", () => {
        setPhoneConnected(true);
        setBoxTime(new Date().toLocaleString());
      });

      socket.on("phoneDisconnected", () => {
        setPhoneConnected(false);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("phoneConnected");
      }
    };
  }, [socket, setPhoneConnected, setBoxTime]); // Added setBoxTime to dependency array

  const [userAuthenticated] = useAtom(authenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once the authentication status has been determined
    setLoading(false);
  }, [userAuthenticated]);

  if (loading) {
    return null; // Render nothing while loading
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
