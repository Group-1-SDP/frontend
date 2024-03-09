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

export const topTodoItem = atomWithStorage("topTodo", "");
export const authenticated = atomWithStorage("userAuth", false);
export const phoneConnectedState = atomWithStorage("phoneConnectedState", false);
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<MainPage />} />
          <Route path="to-do list" element={<TodoList />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
