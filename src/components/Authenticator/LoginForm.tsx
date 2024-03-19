import { useAtom } from "jotai";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { authenticated } from "../../App";
import { useEffect, useState } from "react";
import { userIDAtom, usernameAtom } from "../Utils/GlobalState";
import { APILink } from "../Utils/GlobalState";
import { navStateAtom } from "../Utils/GlobalState";
import { AnimatePresence, motion } from "framer-motion";

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
        <motion.div className="mt-12 mb-12">
          <div className="relative">
            <div className="relative flex items-center">
              <div className="relative w-full min-w-[200px] h-12">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  placeholder=""
                  className="w-full h-full bg-white px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Username
                </label>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className="mb-12">
          <div className="relative">
            <div className="relative flex items-center">
              <div className="relative w-full min-w-[200px] h-12">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder=""
                  className="w-full h-full bg-white px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Password
                </label>
              </div>
            </div>
            <div className="flex justify-end text-sm text-blue-700 mt-2">
              Forgot Password?
            </div>
          </div>
        </motion.div>
        <motion.div className="flex justify-center">
          <button
            type="submit"
            onClick={handleConnect}
            className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-greenAccent dark:hover:bg-greenAccent"
          >
            Login
          </button>
        </motion.div>

        <motion.div className="text-red-500 text-center mt-2">
          {error}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}

export default LoginForm;
