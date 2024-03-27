import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { APILink, userIDAtom } from "../Utils/GlobalState";
import { friendAddedAtom } from "../Utils/GlobalState";
import InputBox from "../Utils/ReusableComponents/InputBox";

function FriendAdd() {
  const [username, setUsername] = useState("");
  const [userID] = useAtom(userIDAtom);
  const [friendAdded, setFriendAdded] = useAtom(friendAddedAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleConnect = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      setUsername("");
      if (userID) {
        const response = await fetch(`${APILink}/api/${userID}/add-friend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friend_username: username,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add friend. Please try again later.");
        }
      }
      setFriendAdded(!friendAdded);
      setSuccessMessage(`Friend ${username} added successfully!`);
      setErrorMessage("");
    } catch (error: any) {
      console.error("Error while adding friend:", error.message);
      setSuccessMessage("");
      setErrorMessage(error.message);

      // Handle the error here, such as displaying an error message to the user
    }
  };

  return (
    <motion.div layout="position" className="flex flex-col h-[120px] w-[400px] bg-white rounded-xl mt-4 px-4 py-4 justify-center">
      <div className="flex">
        <InputBox
          value={username}
          placeholder="Friend Username"
          onChange={setUsername}
        />
        <motion.div className="flex justify-center h-12 text-sm">
          <button
            type="submit"
            onClick={handleConnect}
            className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-greenAccent dark:hover:bg-greenAccent"
          >
            Add
          </button>
        </motion.div>
      </div>
      <div>
        {errorMessage !== "" && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        {successMessage !== "" && (
          <div className="text-green-500 text-center mt-2">{successMessage}</div>
        )}
      </div>
    </motion.div>
  );
}

export default FriendAdd;
