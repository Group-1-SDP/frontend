import { useAtom } from "jotai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { APILink, usernameAtom } from "../../Utils/GlobalState";
import { authenticated } from "../../../App";

function DeleteUserForm() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setUserAuthenticated] = useAtom(authenticated);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const handleDelete = async (event: { preventDefault: () => void }) => {
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
    <form className="mt-4">
      <div className="mb-6 relative">
        <label className="block mb-4 text-xl font-medium">
          Enter your password to delete
        </label>
        <div className="relative">
          <div className="relative flex items-center">
            <RiLockPasswordLine
              size={20}
              color="lightgray"
              className="absolute left-3"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              placeholder="Password"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleDelete}
          className="text-white text-2xl font-medium px-5 py-2.5 rounded-md text-center dark:bg-red-600 dark:hover:bg-red-700"
        >
          Delete User
        </button>
      </div>

      <div className="text-red-500 text-center mt-2">{error}</div>
    </form>
  );
}

export default DeleteUserForm;
