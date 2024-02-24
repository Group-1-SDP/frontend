import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { useAtom } from "jotai";
import { topTodoItem } from "../../App";

export const TodoWrapper = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; }[]>([]);
  const [topTask, setTopTask] = useAtom(topTodoItem);
  const rootAPIEndpoint = 'https://fantastic-broccoli-p6jp6jjvpvwhrj5x-5000.app.github.dev/api/';

  // Debug
  useEffect(() => {
    fetch(rootAPIEndpoint + 'isAlive', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  })

  useEffect(() => {
    fetch(rootAPIEndpoint + 'getUserTasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'test_username'
      })
    })
      .then(response => response.json())
      .then(data => {
        // Debug
        console.log("Data from getUserTasks: ", data);
        const formattedTasks = data.map((task: any) => ({
          id: task.task_id,
          text: task.contents,
          completed: task.completed
        }));
        setTasks(formattedTasks);
      });
  })
  
  useEffect(() => {
    if (tasks.length > 0) {
      const newTopTask = tasks[0].text
      setTopTask(newTopTask)
    }
    
    
  }, [tasks])

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
