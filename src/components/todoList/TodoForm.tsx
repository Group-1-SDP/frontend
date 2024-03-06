import React, { useState } from "react";
import { useAtom } from "jotai";
import { topTodoItem } from "../../App";

export interface TodoFormProps {
   addTask: (task: string) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [value, setValue] = useState("");
  const [topTask, setTopTask] = useAtom(topTodoItem);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) { return; }
    addTask(value);
    setTopTask(value)
    setValue("");
  };

  return (
    <div className="p-4 m-4 rounded-xl flex items-center hover:shadow-xl shadow-sm transition duration-300">
      <form action="" className="flex " onSubmit={handleSubmit} style={{ width: "100%" }}>
        <input
          type="text"
          className="outline-none"
          placeholder="What is the task today?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "calc(100% - 68px)" }} // Adjust 68px according to your button's width and margins
        />
        <button className="mr-2 px-4 py-2 bg-slate-100 rounded-xl hover:bg-greenAccent hover:text-white transition-colors ">Add Task</button>
      </form>
    </div>
  );
};
