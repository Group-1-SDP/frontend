import React from "react";
import ProfileBox from "./ProfileBox";
import StatBox from "./StatBox";

const profile = {
  name: "Jonathan",
  username: "jsteel56",
  tasksSet: 50,
  tasksCompleted: 100,
  total: 1000,
};

function ProfileWrapper() {
  return (
    <div className="flex justify-center">
      <div className="w-[800px] flex justify-between">
        <ProfileBox name={profile.name} username={profile.username} />
        <StatBox statName="Tasks Set" stat={profile.tasksSet} />
        <StatBox statName="Tasks Completed" stat={profile.tasksCompleted} />
        <StatBox statName="Total Points" stat={profile.total} />
      </div>
    </div>
  );
}

export default ProfileWrapper;
