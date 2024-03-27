import React, { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import NotesImage from "/src/assets/notesimage.svg";
import { APILink, navStateAtom, userIDAtom } from "../Utils/GlobalState";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

function TodoTracker() {
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean; date?: string }[]
  >([]);
  const [, editNavStateAtom] = useAtom(navStateAtom);
  const [userID] = useAtom(userIDAtom);
  const APIroot = APILink + "/api/";
  const navigate = useNavigate();

  const handleEditClick = () => {
    editNavStateAtom("To-Do List");
    navigate("/todo");
  };

  const updateAPI = async (task_id: string) => {
    try {
      const response = await fetch(APIroot + userID + "/complete-task/" + task_id, {
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

  return (
    <div className="w-[380px] h-[365px] shadow-sm bg-white rounded-xl overflow-auto">
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="font-bold text-[22px]">To-do Items</h1>
        <h2
          className="font-bold text-[16px] text-greenAccent hover:underline cursor-pointer"
          onClick={handleEditClick}
        >
          Edit
        </h2>
      </div>
      <ul className="flex flex-col">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center px-4 py-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className="mr-2"
              />
              <span className={`${task.completed ? "line-through text-gray-400" : "text-black"}`}>
                {task.text}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoTracker;
