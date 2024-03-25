import { useAtom } from "jotai";
import React from "react";
import { levelAtom, profilePicAtom, usernameAtom } from "../GlobalState";

function UserDisplay() {
  const [username] = useAtom(usernameAtom);
  const [level] = useAtom(levelAtom);
  const [profilePic] = useAtom(profilePicAtom);

  return (
    <div>
      <div className="flex items-center space-x-4">
        <img
          alt="User Profile Picture. May be an image of a Koala."
          className="rounded-full w-[55px] h-[55px]"
          src={`src/assets/sampleProfiles/${profilePic}`}
        />
        <div className="flex flex-col font-semibold ">
          <h1>{username}</h1>
          <h1>Level {level}</h1>
        </div>
      </div>
    </div>
  );
}

export default UserDisplay;
