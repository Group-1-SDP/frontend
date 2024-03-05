import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { emailAtom, usernameAtom } from "../Utils/GlobalState";
import { useAtom } from "jotai";
import { authenticated } from "../../App";
export interface MenuItemProps {
  itemName: string;
  path?: string;
  top?: boolean;
  bottom?: boolean;
  onClick?: () => void;
}

function MenuItem({ itemName, path, top, bottom, onClick }: MenuItemProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={
          "pl-3 py-2 flex justify-start border-white hover:bg-gray-300 transition-colors w-full " +
          (top ? "rounded-t-xl " : "") +
          (bottom ? "rounded-b-xl " : "")
        }
      >
        {itemName}
      </button>
    );
  }
  return (
    <a
      href={path}
      className={
        "pl-3 py-2 border-white hover:bg-gray-300 transition-colors w-full " +
        (top ? "rounded-t-xl " : "") +
        (bottom ? "rounded-b-xl " : "")
      }
    >
      {itemName}
    </a>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useAtom(emailAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [, setUserAuthenticated] = useAtom(authenticated);

  const handleLogout = () => {
    setUsername("");
    setEmail("");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUserAuthenticated(false);
    location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, open]);

  return (
    <div className="relative">
      <div ref={dropdownRef}>
        <motion.div
          style={{ cursor: "pointer" }}
          className={
            "flex items-center transition-colors font-semibold text-xl px-4 py-2 mx-3 rounded-xl" +
            (open ? " bg-gray-300" : "")
          }
          onClick={() => {
            setOpen(!open);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          animate={{
            backgroundColor: open || hovering ? "#d1d5db" : "#ffffff",
          }}
        >
          <div className="p-5 mr-2 rounded-full bg-black"></div>
          <h1>
            Hello, {username}, {email}!
          </h1>
        </motion.div>
        <div></div>
        <AnimatePresence>
          {open && (
            <motion.div
              className="left-3 my-2 space-y-4 rounded-xl font-semibold text-xl absolute bg-gray-200 w-full"
              animate={{ opacity: open ? 1 : 0 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid divide-y-2 rounded-t-xl rounded-b-xl">
                <MenuItem itemName="Profile" path="/profile" top={true} />
                <MenuItem itemName="Friends" path="/friends" />
                <MenuItem itemName="Modules" path="/modules" />
                <MenuItem itemName="Settings" path="/settings" />
                <MenuItem
                  itemName="Logout"
                  onClick={handleLogout}
                  bottom={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default UserMenu;
