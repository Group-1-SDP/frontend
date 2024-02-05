import React from "react";

function ToDoControlComponent() {
  return (
    <div className="">
      <div className="p-4 m-4 rounded-md flex items-center justify-between hover:bg-gray-300 transition duration-300">
        <button type="button" className="mr-2 underline">
          <a href="/todo">Edit</a>
        </button>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <p className="mr-2">previewTask</p>
        </div>
        <div className="flex items-center"></div>
      </div>
    </div>
  );
}

export default ToDoControlComponent;
