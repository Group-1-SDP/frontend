import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Task, Todo } from "./Todo";
import { useAtom } from "jotai";
import { APILink, userIDAtom, usernameAtom } from "../Utils/GlobalState";
import DropdownSwitcher from "../Utils/DropdownSwitcher";
import TodoFilter, { Filter } from "./TodoFilter";

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
    { id: string; text: string; completed: boolean; date?: string }[]
  >([]);
  const [username] = useAtom(usernameAtom);
  const [userID] = useAtom(userIDAtom);
  const APIroot = APILink + "/api/";
  const [activeFilter, setActiveFilter] = useState<string>("To-Do");
  const [activeTimeFrame, setActiveTimeFrame] = useState<string>("All");
  const [inactiveTimeFrames, setInactiveTimeFrames] = useState<string[]>([
    "Today",
    "Upcoming",
    "Anytime",
  ]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(APIroot + userID + "/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user tasks");
        }
        const apiResponse = await response.json();
        const data = apiResponse.tasks;

        if (Array.isArray(data)) {
          const formattedTasks = data.map((task: any) => ({
            id: task.task_id,
            text: task.contents,
            completed: task.completed,
          }));
          setTasks(formattedTasks);
        } else {
          console.error("Data received from server is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchUserTasks();
  }, [userID]);

  useEffect(() => {
    if (tasks.length > 0) {
      const newTopTask = tasks[0].text;
    }
  }, [tasks]);

  const addTask = (text: string, date?: Date) => {
    const task_id = generateRandomString();
    const newTask = {
      id: task_id,
      text,
      completed: false,
      due_date: date ? date.toISOString().split("T")[0] : undefined,
    };
    sendToAPI(task_id, text);
    setTasks([...tasks, newTask]);
  };

  const sendToAPI = async (task_id: string, contents: string) => {
    try {
      const response = await fetch(APIroot + userID + "/add-task", {
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
    try {
      const response = await fetch(APIroot + "updateTask", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testusername",
          task_id: task_id,
          completed: "true",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user task");
      }
    } catch (error) {
      console.error("error updating task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(APIroot + userID + "/delete-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      } else {
        console.log("deleted task");
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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

  const filterTasks = (filter: string) => {
    setActiveFilter(filter);
  };

  const changeTimeFrame = (timeFrame: string) => {
    // Filter out the selected timeFrame
    const updatedInactiveTimeFrames = inactiveTimeFrames.filter(
      (frame) => frame !== timeFrame
    );

    // Update state
    setInactiveTimeFrames(updatedInactiveTimeFrames);

    // Add back the previously active timeFrame
    setInactiveTimeFrames([...updatedInactiveTimeFrames, activeTimeFrame]);

    // Update active timeFrame
    setActiveTimeFrame(timeFrame);
  };

  const sortedTasks = tasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  const filteredTasks = sortedTasks
    .filter((task) => {
      // Apply active filter
      switch (activeFilter) {
        case "All":
          return true;
        case "Completed":
          return task.completed;
        case "To-Do":
          return !task.completed;
        default:
          return false; // Handle invalid filters
      }
    })
    .filter((task) => {
      // Apply active time frame filter
      switch (activeTimeFrame) {
        case "Today":
          // Assuming date is in the format YYYY-MM-DD
          return task.date === new Date().toISOString().split("T")[0];
        case "Upcoming":
          // Assuming date is in the format YYYY-MM-DD
          return task.date && new Date(task.date) > new Date();
        case "Anytime":
          // Assuming task has no date
          return !task.date;
        default:
          return true; // Include all tasks for "All" option
      }
    });

  return (
    <div className="mt-2 flex justify-center">
      <div className="w-full">
        <DropdownSwitcher
          active={activeTimeFrame}
          others={inactiveTimeFrames}
          switcher={changeTimeFrame}
        />
        <TodoFilter
          filter={{
            name: "To-Do",
            active: activeFilter === "To-Do",
            onClick: () => filterTasks("To-Do"),
          }}
        />
        <TodoFilter
          filter={{
            name: "Completed",
            active: activeFilter === "Completed",
            onClick: () => filterTasks("Completed"),
          }}
        />
        <TodoFilter
          filter={{
            name: "All Tasks",
            active: activeFilter === "All",
            onClick: () => filterTasks("All"),
          }}
        />
        <TodoForm addTask={addTask} />
        {filteredTasks.map((task) => (
          <Todo
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            timeFrame={activeTimeFrame}
          />
        ))}
      </div>
    </div>
  );
};
