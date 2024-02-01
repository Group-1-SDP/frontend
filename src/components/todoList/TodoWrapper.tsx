import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";

export const TodoWrapper = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; }[]>([]);

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleCompleted = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      } else {
        return task;
      }
    }));
  }

  const sortedTasks = tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  return (
    <div className="TodoWrapper">
      
      <TodoForm addTask={addTask} />
      {sortedTasks.map((task) => (
        <Todo
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </div>
  );
};
