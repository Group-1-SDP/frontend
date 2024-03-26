import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import NotesImage from "/src/assets/notesimage.svg";

function TodoTracker() {
  return (
    <div className="w-[380px] h-[365px] shadow-sm bg-white rounded-xl">
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="font-bold text-[22px]">To-do Items</h1>
        <h2 className="font-bold text-[16px] text-greenAccent hover:underline ">
          <a href="/todo">Edit</a>
        </h2>
      </div>
      <div className="flex justify-center items-center space-x-[34px]">
        <div className="w-[200px] h-[150px] mx-6">
          <img src={NotesImage} style={{ fill: '#046244'}}/>
        </div>
      </div>
      <div className="p-4 pt-10 flex justify-center">
        <div className="flex flex-col items-center space-x-3 py-6">
          <div className="font-bold text-xl">Finish FNLP Reading 5.51-5.5</div>
          <h2 className="text-[16px] text-greenAccent font-semibold">Done?</h2>
        </div>
      </div>
    </div>
  );
}

export default TodoTracker;
