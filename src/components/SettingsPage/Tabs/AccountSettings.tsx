import React, { useEffect, useState } from "react";
import UserDisplay from "../../Utils/ReusableComponents/UserDisplay";
import InputBox from "../../Utils/ReusableComponents/InputBox";
import { APILink, userIDAtom, usernameAtom } from "../../Utils/GlobalState";
import { useAtom } from "jotai";

function AccountSettings() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userID] = useAtom(userIDAtom);
  const [, setUsername] = useAtom(usernameAtom)

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${APILink}/api/${userID}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          old_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Handle success
        setCurrentPassword("");
        setNewPassword("");
        setNewEmail("");
        setNewUsername("");
        setUsername(newUsername);
        setUsernameTaken(false);
        setEmailError("");
        setPasswordError("");
      } else {
        // Handle error
        console.error(data.message); // Log the error message
        if (data.message === "Username already exists.") {
          setUsernameTaken(true);
        } else if (data.message === "Invalid email.") {
          setEmailError("Invalid email format");
        } else if (data.message === "Invalid password.") {
          setPasswordError("Incorrect old password");
        } else if (data.message === "Email already exists.") {
          setEmailError("Email already exists.");
        } else {
          // Handle other errors
          console.error("An error occurred:", data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex w-[640px] h-[120px] items-center justify-between bg-gray-100 px-20 py-15 rounded-xl text-2xl">
        <UserDisplay />
        <button className="bg-greenAccent text-sm text-white px-4 py-3 rounded-xl">
          Change Photo
        </button>
      </div>
      <div className="w-[600px] my-10">
        <div className="pb-5 font-semibold text-xl">Change Username</div>
        <InputBox
          placeholder="New Username"
          value={newUsername}
          onChange={setNewUsername}
        />
        {usernameTaken && (
          <div className="text-red-500 text-sm">Username already taken</div>
        )}
        <div className="my-5 font-semibold text-xl">Change Email</div>
        <InputBox
          placeholder="New Email"
          value={newEmail}
          onChange={setNewEmail}
        />
        {emailError && (
          <div className="text-red-500 text-sm">{emailError}</div>
        )}
        <div className="py-5 font-semibold text-xl">Change Password</div>
        <div className=" space-y-3">
          <InputBox
            placeholder="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            type="password"
          />
          <InputBox
            placeholder="New Password"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
          />
        </div>
        {passwordError && (
          <div className="text-red-500 text-sm">{passwordError}</div>
        )}
        <button
          className="bg-greenAccent w-full text-white px-4 py-3 rounded-xl mt-6"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
