import { useAtom } from "jotai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { authenticated } from "../../App";
import { useEffect, useState } from "react";
import { APILink, usernameAtom, emailAtom } from "../Utils/GlobalState";

function RegisterForm() {
  const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated);
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        setUsername(data.username);
        localStorage.setItem("username", username);
        setEmail(data.email);
        localStorage.setItem("email", email);
        setUserAuthenticated(true);
      } else {
        setError(data.message);
      }
      console.log(response.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form>
      <div className="mb-6">
        <label className="block text-xl font-semibold">Create Username</label>
        <div className="relative">
          <FaUser
            size={20}
            color="black"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="pl-10 block w-full p-4 rounded-lg "
            placeholder="Username"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold">Your Email</label>
        <div className="relative">
          <MdEmail
            size={20}
            color="black"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="pl-10 block w-full p-4 rounded-lg "
            placeholder="Email"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold">Create Password</label>
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
              placeholder="Password"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
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
