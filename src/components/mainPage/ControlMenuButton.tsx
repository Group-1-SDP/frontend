import React from "react";

export interface ControlMenuButtonProps {
  menuName: string;
}

function ControlMenuButton({ menuName }: ControlMenuButtonProps) {
  return (
    <div>
      <div className="flex mx-5 px-3 my-7 py-3 items-center hover:bg-gray-300 transition-colors rounded-xl">
        <div className="bg-black rounded-full p-5"></div>
        <div className="px-2 font-semibold text-xl">
          <h1>{menuName}</h1>
        </div>
      </div>
    </div>
  );
}

export default ControlMenuButton;
