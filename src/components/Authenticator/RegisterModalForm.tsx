import { useAtom } from "jotai";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { authenticated } from "../../App";
import { useEffect, useState } from "react";
import { APILink, usernameAtom, emailAtom } from "../Utils/GlobalState";

function RegisterForm() {
  const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated);
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  }, [username, email]);

  const handleConnect = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(APILink + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setUsername(username);
        const newAuthState = !userAuthenticated;
        setUserAuthenticated(newAuthState);
      } else {
        setError(data.message);
      }
      console.log(response.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="mt-4">
      <div>
        <label className="block text-xl font-medium mb-1">Username</label>
        <div className="relative">
          <FaRegUser
            size={20}
            color="lightgray"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Username"
          />
        </div>
      </div>

      <div>
        <label className="block text-xl font-medium mt-6 mb-1">Email</label>
        <div className="relative">
          <FaRegUser
            size={20}
            color="lightgray"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Email"
          />
        </div>
      </div>

      <div>
        <label className="block mt-6 mb-1 text-xl font-medium ">Password</label>
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

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          onClick={handleConnect}
          className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-green-800 dark:hover:bg-green-900"
        >
          Register
        </button>
      </div>

      <div className="text-red-500 text-center mt-2">{error}</div>
    </form>
  );
}

export default RegisterForm;
