import React from "react";

function ToDoControlComponent() {
  return (
    <div className="">
      <div className="p-4 m-4 rounded-md flex items-center justify-between hover:bg-gray-300 transition duration-300">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <p className="mr-2">previewTask</p>
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
