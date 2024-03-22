import { useAtom } from "jotai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { authenticated } from "../../App";
import { useState } from "react";
import {
  APILink,
  usernameAtom,
  userIDAtom,
  navStateAtom,
} from "../Utils/GlobalState";
import { motion } from "framer-motion";
import InputBox from "../Utils/ReusableComponents/InputBox";

function RegisterForm() {
  const [, setUserAuthenticated] = useAtom(authenticated);
  const [username, setUsername] = useAtom(usernameAtom);
  const [userID, setUserID] = useAtom(userIDAtom);
  const [, setNavState] = useAtom(navStateAtom);
  const [email, setEmail] = useState("");
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

      if (response.status === 201) {
        setUserID(data.user.id);
        setUsername(data.user.username);
        setUserAuthenticated(true);
        setNavState("/");
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
      <div className="flex flex-col space-y-6 py-6">
        <InputBox
          value={email}
          placeholder="Email"
          onChange={setEmail}
          type="email"
          background="white"
        />
        <InputBox
          value={username}
          placeholder="Username"
          onChange={setUsername}
          background="white"
        />
        <InputBox
          value={password}
          placeholder="Password"
          onChange={setPassword}
          type="password"
          background="white"
        />
      </div>
      <motion.div className="flex justify-center mt-8">
        <button
          type="submit"
          onClick={handleConnect}
          className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-greenAccent dark:hover:bg-greenAccent"
        >
          Register
        </button>
      </motion.div>
      <div className="text-red-500 text-center mt-2">{error}</div>
    </form>
  );
}

export default RegisterForm;
