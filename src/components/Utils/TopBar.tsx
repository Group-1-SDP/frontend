import React from "react";
import UserMenu from "../mainPage/UserMenu";

function topBar() {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="items-center">
        <UserMenu />
      </div>
      <div className="flex items-center px-8 py-10">
        <div className="px-2 text-xl font-bold">TickBox</div>
        <div className="bg-black rounded-full p-5"></div>
      </div>
    </div>
  );
}

export default topBar;
