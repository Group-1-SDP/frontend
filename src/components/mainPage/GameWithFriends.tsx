import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import React from "react";

function GameWithFriends() {
  return (
    <div className="w-[380px] h-[365px] shadow-sm bg-white rounded-xl">
      <h1 className="font-bold text-[22px] pt-6 pl-6">Recent Games</h1>
      <ul className="space-y-1 flex flex-col items-center">
        <div className="flex justify-center gap-20">
          <h1> Player </h1> <h2> Game State</h2>{" "}
        </div>
      </ul>
    </div>
  );
}

export default GameWithFriends;
