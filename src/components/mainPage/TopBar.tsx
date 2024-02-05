import React from "react";
import UserMenu from "./UserMenu";

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
            className="w-[225px] h-auto"
          />
        </a>
      </div>
    </div>
  );
}

export default topBar;

