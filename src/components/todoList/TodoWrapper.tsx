import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Task, Todo } from "./Todo";
import { useAtom } from "jotai";
import { topTodoItem } from "../../App";

function generateRandomString(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export const TodoWrapper = () => {
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);
  const [topTask, setTopTask] = useAtom(topTodoItem);
  const APIroot = "http://localhost:5000/api/";

  useEffect(() => {


    
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const newTopTask = tasks[0].text;
      setTopTask(newTopTask);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    const task_id = generateRandomString();
    const newTask = {
      id: task_id,
      text,
      completed: false,
    };
    sendToAPI(task_id, text)
    setTasks([...tasks, newTask]);
   
  };

  const sendToAPI = async (task_id: string, contents: string) => {
    try {
      const response = await fetch(APIroot + "addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testusername",
          task_id: task_id,
          contents: contents,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user tasks");
      }
    } catch (error) {
      console.error("error adding task");
    }
  };

  const updateAPI = async (task_id: string) => {
    console.log("updating api")
    try {
      const response = await fetch(APIroot + "updateTask", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testusername",
          task_id: task_id,
          completed: "true"
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user task");
      }
    } catch (error) {
      console.error("error updating task");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
    updateAPI(id);
  };

  const sortedTasks = tasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className="flex justify-center">
    <div className="w-[600px]">
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
    </div>
  );
};
