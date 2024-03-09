import React from "react";

function TodoTracker() {
  return (
    <div className="w-[360px] h-[365px] shadow-sm bg-white rounded-xl">
      <div className="flex items-center justify-between p-6">
        <h1 className="font-bold text-[22px]">To-do Items</h1>
        <h2 className="font-bold text-[16px] text-greenAccent hover:bg-greenAccent hover:text-white transition-colors"><a href="/todo">Edit</a></h2>
      </div>
      <div className="flex justify-center">
        <div className="w-[160px] h-[160px] rounded-full bg-greenAccent"></div>
      </div>
      <div className="p-4 pt-[40px] flex justify-center">
        <div className="flex flex-col items-center space-x-3">
          <div className="font-bold">Finish FNLP Reading 5.51-5.5</div>
          <h2 className="text-[16px] text-greenAccent font-semibold">Done?</h2>
        </div>
      </div>
    </div>
  );
}

export default TodoTracker;
