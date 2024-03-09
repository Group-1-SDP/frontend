import { useAtom } from "jotai";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { authenticated } from "../../App";
import { useEffect, useState } from "react";
import { emailAtom, usernameAtom } from "../Utils/GlobalState";
import { APILink } from "../Utils/GlobalState";

function LoginForm() {
  const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated);
  const [username, setUsername] = useAtom(usernameAtom);
  const [, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(APILink + "/api/login", {
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
        setUsername(data.username);
        localStorage.setItem("username", data.username);
        setEmail(data.email);
        localStorage.setItem("email", data.email);

        const newAuthState = !userAuthenticated;
        setUserAuthenticated(newAuthState);
        console.log(response.status);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form>
      <div className="mb-6">
        <label className="block mb-1 text-xl font-semibold">
          Username/Email
        </label>
        <div className="relative">
          <FaUser
            size={20}
            color="black"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="text"
            className="pl-10 block w-full p-4 rounded-lg"
            placeholder="Enter your Username or Email"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-xl font-semibold">Password</label>
        <div className="relative">
          <div className="relative flex items-center">
            <RiLockPasswordFill
              size={20}
              color="black"
              className="absolute left-3"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="pl-10 block w-full p-4 rounded-lg "
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-end text-sm text-blue-700 mt-2">
            Forgot Password?
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleConnect}
          className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-green-800 dark:hover:bg-green-900"
        >
          Login
        </button>
      </div>

      <div className="text-red-500 text-center mt-2">{error}</div>
    </form>
  );
}

export default LoginForm;
