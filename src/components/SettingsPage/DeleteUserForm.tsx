import { useAtom } from "jotai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { APILink, usernameAtom } from "../Utils/GlobalState";
import { authenticated } from "../../App";

function DeleteUserForm() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setUserAuthenticated] = useAtom(authenticated);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const handleConnect = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(APILink + "/api/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setUsername("");
        localStorage.removeItem("username");
        setUserAuthenticated(false);
        location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-xl font-semibold mb-2">Enter your password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-4 rounded-lg dark:bg-gray-300"
        />
      </div>
      <div className="text-red-500 text-center mt-2">{error}</div>
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleConnect}
          className="text-white text-lg font-medium p-2 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}

export default DeleteUserForm;
