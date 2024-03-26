import React, { useState } from "react";
import { useAtom } from "jotai";

export interface TodoFormProps {
  addTask: (task: string, date?: Date) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    addTask(value, date);
    setValue("");
    setDate(undefined);
  };

  return (
    <div className="p-4 my-4 rounded-xl flex items-center hover:shadow-xl shadow-sm transition duration-300 bg-white">
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
      >
        <input
          type="text"
          className="outline-none mb-2"
          placeholder="What is the task today?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // style={{ width: "calc(100% - 68px)" }} // Adjust 68px according to your button's width and margins
        />
        <input
          type="date"
          className="outline-none"
          value={date?.toISOString().slice(0, 10)}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </form>
    </div>
  );
};
