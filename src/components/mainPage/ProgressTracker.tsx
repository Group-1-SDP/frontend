import React from "react";
import { Barplot } from "./BarChart/Barplot";

function ProgressTracker() {

    const data = [
        {name:"M", value: 4},
        {name:"Tu", value: 1},
        {name:"W", value: 8},
        {name:"Th", value: 6},
        {name:"F", value: 7},
    ]
    

  return (
    <div className="w-[380px] h-[365px] shadow-sm bg-white rounded-xl">
      <div className="flex items-center justify-between p-6">
        <h1 className="font-bold text-[22px]">Progress</h1>
        <h2 className="font-bold text-[16px] text-greenAccent hover:underline"><a href="/profile">See more</a></h2>
      </div>
      <div className="flex justify-center">
        <Barplot data={data} height={240} width={300}/>
      </div>
    </div>
  );
}

export default ProgressTracker;
