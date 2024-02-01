import React, { useState } from "react";

export interface TodoFormProps {
   addTask: (task: string) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  return (
    <div className="p-4 m-4 rounded-md flex items-center hover:shadow-xl transition duration-300">
      <form action="" className="TodoForm" onSubmit={handleSubmit}>
        <button className="mr-2 p-2 bg-slate-100 rounded-lg" type="submit">Add Task</button>
        <input
          type="text"
          className="outline-none"
          placeholder="What is the task today?"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};
