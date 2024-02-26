import { useState, useEffect } from "react";
import Authenticator from "./views/Authenticator";
import MainPage from "./views/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./views/TodoList";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { io } from "socket.io-client";
import { Socket } from 'socket.io-client';

export const topTodoItem = atomWithStorage("topTodo", "");
export const authenticated = atomWithStorage("userAuth", false);
export const phoneConnectedState = atomWithStorage("phoneConnectedState", false);

function App() {

  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [phoneConnected, setPhoneConnected] = useAtom(phoneConnectedState);

  useEffect(() => {
    const newSocket = io("ws://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
        setSocketConnected(true);
      })

      socket.on("disconnect", () => {
        console.log("disconnected!");
        setSocketConnected(false);
      })

      socket.on("phoneConnected", () => {
        setPhoneConnected(true);
      })

      socket.on("phoneDisconnected", () => {
        setPhoneConnected(false);
      })
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("phoneConnected");
      }
    }
  }, [socket])
 
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="todo" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
