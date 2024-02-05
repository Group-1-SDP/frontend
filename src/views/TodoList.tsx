import React from "react";
import { TodoWrapper } from "../components/todoList/TodoWrapper";
import TopBar from "../components/mainPage/TopBar";

export const TodoList = () => {
  return (
    <div>
      <div>
      <TopBar />
      </div>
      <div className="px-[250px]">
      <TodoWrapper />

      </div>
    </div>
  );
};
