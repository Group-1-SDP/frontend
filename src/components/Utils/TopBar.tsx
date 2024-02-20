import React from "react";
import UserMenu from "../mainPage/UserMenu";

function topBar() {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="items-center">
        <UserMenu />
      </div>
      <div className="flex items-center px-8 py-10">
        <a href="/">
        <img
          src="src/assets/Tickbox Logo White Full.svg"
          alt="Logo"
          className="w-auto h-[60px]"
        />
        </a>
      </div>
    </div>
  );
}

export default topBar;
