import React from "react";
import { easeInOut, motion } from "framer-motion";
  import Logo from "../Logo";
import { usernameAtom } from "../GlobalState";
import { useAtom } from "jotai";

function topBar() {
  const [username] = useAtom(usernameAtom);
  return (
    <div className="flex justify-end pr-48 pt-3 w-full h-16">
      <div className="flex items-center">
        <div className="p-5 mr-2 rounded-full bg-black"></div>
        <h1>{username}</h1>
      </div>
    </div>
  );
}

export default topBar;
