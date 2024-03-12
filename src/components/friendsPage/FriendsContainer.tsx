import React, { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { useAtom } from "jotai";
import { APILink } from "../Utils/GlobalState";

const friends = [
  { username: "Jonathan", level: 1, progress: 0.6, profilePic: "" },
  { username: "Matthieu", level: 1, progress: 0.4, profilePic: "" },
  { username: "Linus", level: 1, progress: 0.9, profilePic: "" },
  { username: "Dylan", level: 1, progress: 0.3, profilePic: "" },
  { username: "Lewis", level: 1, progress: 0.7, profilePic: "" },
  { username: "Cem", level: 1, progress: 0.2, profilePic: "" },
  { username: "Ross", level: 1, progress: 0.5, profilePic: "" },
  { username: "Lyle", level: 1, progress: 0.8, profilePic: "" },
  { username: "Pavel", level: 1, progress: 0.1, profilePic: "" },
];

function FriendsContainer() {
  const APIroot = APILink + "/api/";
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        console.log(APIroot + "getFriends")
        const response = await fetch(APIroot + "getFriends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "username",
          }),
        });
        if (!response.ok) {
          return; 
        }
        const apiResponse = await response.json();
        const data = apiResponse.friends;

        if (Array.isArray(data)) {
          const formattedFriends = data.map((friend: any) => ({
            username: friend.username,
            level: friend.level,
            progress: friend.progress,
            profilePic: friend.profilePic,
          }));
          console.log(formattedFriends)
          setFriends(formattedFriends);
        } else {
          console.error("Data received from server is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchUserFriends();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 w-full rounded-2xl justify-between">
        {friends.map((friend, index) => (
          <FriendCard
            key={index}
            username={friend.username}
            level={friend.level}
            progress={friend.progress}
            profilePic={friend.profilePic}
          />
        ))}
        <div className="flex items-center"></div>
      </div>
    </div>
  );
}

export default FriendsContainer;
