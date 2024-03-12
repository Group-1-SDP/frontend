import React from "react";
import Leaderboard from "../components/friendsPage/Leaderboard";
import Navigation from "../components/Utils/Navigation/Navigation";
import FriendsContainer from "../components/friendsPage/FriendsContainer";

function FriendsPage() {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className=" bg-gray-200 w-full">
          <h1 className="font-bold text-4xl pt-[30px]">
            Friends
          </h1>
          <div className="pt-4">
            <FriendsContainer />
          </div>
      </div>
    </div>
  );
}

export default FriendsPage;
