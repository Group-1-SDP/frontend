import { useAtom } from "jotai";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { authenticated } from "../../App";
import { useEffect, useState } from "react";
import { userIDAtom, usernameAtom } from "../Utils/GlobalState";
import { APILink } from "../Utils/GlobalState";
import { navStateAtom } from "../Utils/GlobalState";
import { AnimatePresence, motion } from "framer-motion";
import InputForm from "../Utils/ReusableComponents/InputBox";
import InputBox from "../Utils/ReusableComponents/InputBox";

function LoginForm() {
  const [, setUserAuthenticated] = useAtom(authenticated);
  const [username, setUsername] = useAtom(usernameAtom);
  const [, setUserID] = useAtom(userIDAtom);
  const [, setNavState] = useAtom(navStateAtom);
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
      console.log(response);

      if (response.status === 200) {
        setUserID(data.id);
        console.log(data.id);
        setUsername(data.username);
        setNavState("/");
        setUserAuthenticated(true);
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
      <AnimatePresence>
        <div className="flex flex-col space-y-6 py-6">
          <InputBox
            value={username}
            placeholder="Username"
            onChange={setUsername}
          />
          <InputBox
            value={password}
            placeholder="Password"
            onChange={setPassword}
            type="password"
          />
        </div>
        
        <motion.div className="flex justify-center">
          <button
            type="submit"
            onClick={handleConnect}
            className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-greenAccent dark:hover:bg-greenAccent"
          >
            Login
          </button>
        </motion.div>
        <div className="flex justify-center text-sm text-blue-700 mt-2">
          Forgot Password?
        </div>

        <motion.div className="text-red-500 text-center mt-2">
          {error}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}

export default LoginForm;
