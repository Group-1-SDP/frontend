import AuthenticatorNavigation from "./AuthenticatorNavigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { SectionAtom } from "./AuthenticatorStates";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Icon from "./Icon";

function Authenticator() {
  const allPages = [
    { page: <LoginForm />, label: "Log In" },
    { page: <RegisterForm />, label: "Sign Up" },
  ];
  const [login, register] = allPages;
  const tabs = [login, register];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabChange = (tab: typeof login | typeof register) => {
    setSelectedTab(tab);
    console.log("Tab changed to", selectedTab);
  };

  return (
    <div className="top-24 pl-28">
      <div className="flex justify-center w-full h-[128px]">

      <Icon />
      </div>
      <div className="relative dark:bg-colorE8E8E8 rounded-3xl shadow-2xl h-640px w-520px overflow-hidden pointer-events-auto">
        <div className="py-[100px] px-20">
          <nav>
            <ul className="flex justify-between text-4xl">
              <li
                className={`${"Log In" === selectedTab.label ? "underline" : ""}`}
                onClick={() => handleTabChange(tabs[0])}
              >
                Log In
              </li>
              <li
                className={`${"Sign Up" === selectedTab.label ? "underline" : ""}`}
                onClick={() => handleTabChange(tabs[1])}
              >
                Sign Up
              </li>
              
            </ul>
          </nav>
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab.label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTab.page}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        <div className="absolute bg-color046244 rounded-full h-[640px] w-[640px] -left-[60%] -top-[88%]"></div>
        <div className="absolute bg-color188764 rounded-full h-[640px] w-[640px] -right-[60%] -bottom-[85%]"></div>
      </div>
    </div>
  );
}

export default Authenticator;
