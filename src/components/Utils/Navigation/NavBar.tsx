import { useAtom } from "jotai";
import {
  leaderboardOptInAtom,
  navStateAtom,
  usernameAtom,
} from "../GlobalState";
import Logo from "../Logo";
import { authenticated } from "../../../App";
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { LuListTodo, LuLogOut } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IconType } from "react-icons";

interface NavInterface {
  name: string;
  isActive: boolean;
  path: string;
  isLogOut: boolean;
  icon: IconType;
}

const NavItem: React.FC<NavInterface> = ({
  name,
  isActive,
  path,
  isLogOut,
  icon: Icon,
}) => {
  const [, setNavState] = useAtom(navStateAtom);
  const [, setUsername] = useAtom(usernameAtom);
  const [, setUserAuthenticated] = useAtom(authenticated);

  const handleLogout = () => {
    setUsername("");
    setUserAuthenticated(false);
    location.href = "/";
  };

  const handleOnClick = () => {
    setNavState(name === "Home" ? "/" : name);
    location.href = path;
  };

  if (isLogOut) {
    return (
      <button
        onClick={handleLogout}
        className={`w-48 text-left px-4 py-3 rounded-lg ${
          isActive ? "bg-color046244 text-white font-bold" : "text-gray-800"
        } hover:bg-color046244 hover:text-white`}
      >
        <div className="flex items-center gap-1">
          <Icon />
          {name}
        </div>
      </button>
    );
  }

  return (
    <a
      href={path}
      onClick={handleOnClick}
      className={`w-48 text-left px-4 py-3 rounded-lg ${
        isActive ? "bg-color046244 text-white font-bold" : "text-gray-800"
      } hover:bg-color046244 hover:text-white`}
    >
      <div className="flex items-center gap-2">
        <Icon />
        {name}
      </div>
    </a>
  );
};

interface SettingsNavigationProps {
  paddingLeft?: number;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  paddingLeft = 0,
}) => {
  const [navState] = useAtom(navStateAtom);
  const [leaderboardOptIn] = useAtom(leaderboardOptInAtom);

  return (
    <div
      className={`fixed top-0 left-${paddingLeft} w-60 bg-white h-full shadow-2xl flex flex-col`}
    >
      <div className="pt-6 flex justify-center">
        <Logo />
      </div>
      <nav className="pt-5 flex-1">
        <ul className="space-y-1 flex flex-col items-center">
          <NavItem
            name="Home"
            isActive={navState === "/"}
            path="/"
            isLogOut={false}
            icon={IoHome}
          />
          <NavItem
            name="To-Do List"
            isActive={navState === "To-Do List"}
            path="/todo"
            isLogOut={false}
            icon={LuListTodo}
          />
          <NavItem
            name="Friends"
            isActive={navState === "Friends"}
            path="/friends"
            isLogOut={false}
            icon={FaUserFriends}
          />
          {leaderboardOptIn && (
            <NavItem
              name="Leaderboard"
              isActive={navState === "Leaderboard"}
              path="/leaderboard"
              isLogOut={false}
              icon={MdLeaderboard}
            />
          )}

          <NavItem
            name="Study Plan"
            isActive={navState === "Schedule"}
            path="/schedule"
            isLogOut={false}
            icon={AiOutlineSchedule}
          />
        </ul>
      </nav>
      <div className="pb-4">
        <ul className="space-y-1 flex flex-col items-center">
          <NavItem
            name="Settings"
            isActive={navState === "Settings"}
            path="/settings"
            isLogOut={false}
            icon={IoSettingsSharp}
          />
          <NavItem
            name="Logout"
            isActive={navState === "Logout"}
            path="/logout"
            isLogOut={true}
            icon={LuLogOut}
          />
        </ul>
      </div>
    </div>
  );
};

export default SettingsNavigation;
