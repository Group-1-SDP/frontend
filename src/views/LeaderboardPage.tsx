import React from "react";
import LeaderboardWrapper from "../components/leaderboardPage/LeaderboardWrapper";
import Navigation from "../components/Utils/Navigation/Navigation";

function LeaderboardPage() {
  return (
    <div>
      <h1 className="font-light text-4xl">Leaderboards</h1>
      <LeaderboardWrapper />
    </div>
  );
}

export default LeaderboardPage;
