import { useAtom } from "jotai";
import { useState } from "react";
import { APILink, usernameAtom, emailAtom } from "../Utils/GlobalState";

function AccountsForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleConnect = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      username: username,
      ...(newUserName && { newUsername: newUserName }),
      ...(newEmail && { newEmail: newEmail }),
    };

    try {
      const response = await fetch(APILink + "/api/updateAccountSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (newUserName) {
          setUsername(newUserName);
        }
        if (newEmail) {
          setEmail(newEmail);
        }
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
        <label className="block text-xl font-semibold mb-2">
          Current Username: {username}
        </label>
        <input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="block w-full p-4 rounded-lg dark:bg-gray-300"
          placeholder="Change Username"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl font-semibold mb-2">
          Current Email: {email}
        </label>
        <input
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="block w-full p-4 rounded-lg dark:bg-gray-300"
          placeholder="Change Email"
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
          Update
        </button>
      </div>
    </form>
  );
}

export default AccountsForm;
