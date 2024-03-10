import { useAtom } from "jotai";
import { navStateAtom, emailAtom, usernameAtom } from "../GlobalState";
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
  const [, setEmail] = useAtom(emailAtom);
  const [, setUsername] = useAtom(usernameAtom);
  const [, setUserAuthenticated] = useAtom(authenticated);

  const handleLogout = () => {
    setUsername("");
    setEmail("");
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
        } hover:bg-color046244 hover:text-white transition duration-300 ease-in-out`}
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
      } hover:bg-color046244 hover:text-white transition duration-300 ease-in-out`}
    >
      <div className="flex items-center gap-1">
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
            path="/To-Do List"
            isLogOut={false}
            icon={LuListTodo}
          />
          <NavItem
            name="Friends"
            isActive={navState === "Friends"}
            path="/Friends"
            isLogOut={false}
            icon={FaUserFriends}
          />
          <NavItem
            name="Leaderboard"
            isActive={navState === "Leaderboard"}
            path="/Leaderboard"
            isLogOut={false}
            icon={MdLeaderboard}
          />
          <NavItem
            name="Schedule"
            isActive={navState === "Schedule"}
            path="/Schedule"
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
            path="/Settings"
            isLogOut={false}
            icon={IoSettingsSharp}
          />
          <NavItem
            name="Logout"
            isActive={navState === "Logout"}
            path="/Logout"
            isLogOut={true}
            icon={LuLogOut}
          />
        </ul>
      </div>
    </div>
  );
};

export default SettingsNavigation;
