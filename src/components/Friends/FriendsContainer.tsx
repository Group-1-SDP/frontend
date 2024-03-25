import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { useAtom } from "jotai";
import { APILink, friendAddedAtom } from "../Utils/GlobalState";
import { userIDAtom } from "../Utils/GlobalState";
import { motion } from "framer-motion";

function FriendsContainer() {
  const [friends, setFriends] = useState(
    [] as { username: any; level: any; progress: any; profilePic: any }[]
  );
  const [userID] = useAtom(userIDAtom);
  const [friendAdded] = useAtom(friendAddedAtom);

  useEffect(() => {
    const fetchUserFriends = async () => {
      if (userID) {
        console.log(userID);
        const response = await fetch(
          APILink + "/api/" + userID + "/get-friends",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          return;
        }
        const apiResponse = await response.json();
        if (response.status !== 200) {
          console.log("Error fetching user friends:");
          return;
        }

        console.log(apiResponse.friends);
        const data = apiResponse.friends;

        if (Array.isArray(data)) {
          const formattedFriends = data.map((friend: any) => ({
            username: friend.friend_username,
            level: friend.friend_level,
            progress: friend.friend_progress,
            profilePic: friend.friend_profile_picture,
          }));
          if (formattedFriends.length === 0) {
            return;
          }
          setFriends(
            formattedFriends as {
              username: any;
              level: any;
              progress: any;
              profilePic: any;
            }[]
          );
        } else {
          console.error("Data received from server is not an array:", data);
        }
      }
    };

    fetchUserFriends();
  }, [userID, friendAdded]);

  return (
    <motion.div layout="position" >
      {friends.length === 0 ? (
        <div className="flex items-center justify-center h-[635px]">
          <h1>No friends yet. Try adding some!</h1>
        </div>
      ) : (
        <div className="min-h-[635px] grid grid-cols-4 gap-8 py-4">
          {friends.map((friend, index) => (
            <FriendCard
              key={index}
              username={friend.username}
              level={friend.level}
              progress={friend.progress}
              profilePic={friend.profilePic}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default FriendsContainer;
