import { useAtom } from "jotai";
import { useState } from "react";
import { APILink, usernameAtom, emailAtom } from "../Utils/GlobalState";

function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useAtom(usernameAtom);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleConnect = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(APILink + "/api/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          oldPassword: oldPassword,
          ...(newPassword && { newPassword: newPassword }),
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during the request.");
    }
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-xl font-semibold mb-2">Old Password</label>
        <input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="block w-full p-4 rounded-lg dark:bg-gray-300"
          placeholder="Type your old password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl font-semibold mb-2">New Password</label>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full p-4 rounded-lg dark:bg-gray-300"
          placeholder="Type your new password"
        />
      </div>
      <div className="text-red-500 text-center mt-2">{error}</div>
      <div className="text-green-500 text-center mt-2">{success}</div>
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleConnect}
          className="text-white text-lg font-medium p-2 rounded-lg text-center dark:bg-green-800 dark:hover:bg-green-900"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
