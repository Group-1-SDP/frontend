import { useAtom } from "jotai";
import React from "react";
import { levelAtom, usernameAtom } from "../GlobalState";

function UserDisplay() {
  const [username] = useAtom(usernameAtom);
  const [level] = useAtom(levelAtom);
  return (
    <div>
      <div className="flex items-center space-x-4">
        <img className="rounded-full" src="https://placehold.co/55x55" />
        <div className="flex flex-col font-semibold ">
          <h1>{username}</h1>
          <h1>Level {level}</h1>
        </div>
      </div>
    </div>
  );
}

export default UserDisplay;
