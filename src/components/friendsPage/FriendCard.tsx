import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import React from "react";


interface FriendCardProps {
    username: string;
    level: number;
    profilePic: string;
    progress: number;
  }

function FriendCard(props: FriendCardProps) {
  return (
    <div>
      <div className="w-[360px] h-[365px] shadow-md bg-white rounded-xl">
        <div className="flex items-center justify-between px-4">
          <div className="py-6">
            <h1 className="font-bold text-[22px]">{props.username}</h1>
            <h2 className="font-bold text-[16px]">Level {props.level}</h2>
          </div>
          <div>
            <div className="w-11 h-11 bg-green-600 rounded-full"><img className="rounded-full"src={props.profilePic}></img></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-[-100px]">
            <ActivityRings
              rings={[{ filledPercentage: props.progress, color: "#046244" }]}
            />
          </div>
        </div>
        <div className="mt-[-20px] px-5 flex justify-center">
          <div>
            <button className="w-[120px] h-[50px] bg-greenAccent text-white rounded-l-xl border border-r-2 border-white px-3 py-1">
              Play Game
            </button>
          </div>
          <div className="text-right">
            <button className="w-[120px] h-[50px] bg-greenAccent text-white rounded-r-xl border border-r-2 border-white px-3 py-1">
              Cheer On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
