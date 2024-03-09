import React from "react";
import { Barplot } from "./BarChart/Barplot";

function ProgressTracker() {

    const data = [
        {name:"Mark", value: 90},
        {name:"Robert", value: 12},
        {name:"Emily", value: 34},
        {name:"Marion", value: 53},
        {name:"Nicolas", value: 98},
        {name:"Mélanie", value: 23},
        {name:"Gabriel", value: 18},
        {name:"Jean", value: 104},
        {name:"Paul", value: 2},
    ]
    

  return (
    <div className="w-[360px] h-[365px] shadow-sm bg-white rounded-xl">
      <div className="flex items-center justify-between p-6">
        <h1 className="font-bold text-[22px]">Progress</h1>
        <h2 className="font-bold text-[16px] text-greenAccent">See more</h2>
      </div>
      <div className="flex justify-center">
        <Barplot data={data} height={240} width={300}/>
      </div>
    </div>
  );
}

export default ProgressTracker;
