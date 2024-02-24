import React from "react";

export interface Friend {
  username: string;
  points: number;
  total: number;
  currentUser: boolean;
}

interface LeaderboardElementProps {
  friend: Friend;
}

function LeaderboardElement({ friend }: LeaderboardElementProps) {
  return (
    <div
      className={`p-4 m-4 rounded-md flex items-center justify-between ${
        friend.currentUser ? "bg-green-500 hover:bg-green-700 text-white font-semibold" : "hover:bg-gray-100"
      }  transition duration-300`}
    >
      <div className="flex items-center">
        <p className={`mr-2`}>{friend.username}</p>
      </div>
      <div className="flex items-center">
        <p className="mr-10">{friend.points}</p>
        <p>{friend.total}</p>
      </div>
    </div>
  );
}

export default LeaderboardElement;
