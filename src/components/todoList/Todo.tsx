import React from "react";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

export const Todo = ({ task, deleteTask }: TodoProps) => {
  return (
    <div className="p-4 m-4 rounded-md flex items-center justify-between hover:bg-gray-100 transition duration-300">
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <p className="mr-2">{task.text}</p>
      </div>
      <div className="flex items-center">
        <button type="button" className="mr-2">
          Edit
        </button>
        <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};
