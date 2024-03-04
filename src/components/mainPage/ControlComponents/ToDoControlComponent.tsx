import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { topTodoItem } from "../../../App";

function ToDoControlComponent() {

  const [topTodo, setTopTodo] = useAtom(topTodoItem);
  const [ticked, setTicked] = useState(false)

  const handleTick = () => {
    const newTickedState = ticked ? false : true;
    setTicked(newTickedState);
    if (ticked) {
      setTopTodo("")
      setTicked(false)
    }
  }

  useEffect(() => {
    if (ticked) {
      setTopTodo("")
      console.log(topTodo)
    }
  }, [])
  
  return (
    <div className="">
      <div className="px-4 py-2 mx-4 rounded-md flex items-center justify-between hover:bg-gray-300 transition duration-300">
        <div className="flex items-center">
          {topTodo != "" && <input type="checkbox" className="mr-2" checked={ticked} onClick={handleTick}/>}
          <button onClick={handleTick} className={`mr-2 ${ticked && "line-through"}`}>{topTodo === "" ? "No Tasks." : topTodo}</button>
        </div>
        <div className="flex items-center">
          
          <a href="/todo" className="mr-2 underline">
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

export default ToDoControlComponent;
