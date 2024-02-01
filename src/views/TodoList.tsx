import React from "react";
import { TodoWrapper } from "../components/todoList/TodoWrapper";

export const TodoList = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-start">
        <div className="w-96 h-auto mt-8">
          <img
            src="src/assets/Tickbox Logo White Full.svg"
            alt="Logo"
            className="w-full h-auto"
          />
        </div>
      </div>
      <TodoWrapper />
    </div>
  );
};
