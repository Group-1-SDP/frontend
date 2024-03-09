import { useAtom } from "jotai";
import { navigationSectionAtom } from "../GlobalState";
import Logo from "../Logo";
import { emailAtom, usernameAtom } from "../GlobalState";
import { authenticated } from "../../../App";
import { IoHome } from "react-icons/io5";
import { IconType } from "react-icons";
import { LuListTodo } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

interface NavInterface {
  name: string;
  setActive: (name: string) => void;
  isActive: boolean;
  path: string;
  isLogOut: boolean;
  icon: IconType;
}

const NavItem: React.FC<NavInterface> = ({
  name,
  setActive,
  isActive,
  path,
  isLogOut,
  icon: Icon,
}) => {
  const [, setEmail] = useAtom(emailAtom);
  const [, setUsername] = useAtom(usernameAtom);
  const [, setUserAuthenticated] = useAtom(authenticated);

  const handleLogout = () => {
    setUsername("");
    setEmail("");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUserAuthenticated(false);
    location.href = "/Home";
  };

  const handleOnClick = () => {
    setActive(name);
    localStorage.setItem("navState", name);
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
      className={`w-48 text-left px-4 py-3 rounded-lg ${
        isActive ? "bg-color046244 text-white font-bold" : "text-gray-800"
      } hover:bg-color046244 hover:text-white transition duration-300 ease-in-out`}
      onClick={handleOnClick}
    >
      <div className="flex items-center gap-1">
        <Icon />
        {name}
      </div>
    </a>
  );
};

const SettingsNavigation: React.FC = () => {
  const [currentSection, setCurrentSection] = useAtom(navigationSectionAtom);

  return (
    <div className="fixed top-0 left-0 w-60 bg-white h-full shadow-2xl flex flex-col">
      <div className="pt-6 flex justify-center">
        <Logo />
      </div>
      <nav className="pt-5 flex-1">
        <ul className="space-y-1 flex flex-col items-center">
          <NavItem
            key="Home"
            name="Home"
            setActive={setCurrentSection}
            isActive={currentSection === "Home"}
            path="/Home"
            isLogOut={false}
            icon={IoHome}
          />
          <NavItem
            key="To-Do List"
            name="To-Do List"
            setActive={setCurrentSection}
            isActive={currentSection === "To-Do List"}
            path="/To-Do List"
            isLogOut={false}
            icon={LuListTodo}
          />
          <NavItem
            key="Friends"
            name="Friends"
            setActive={setCurrentSection}
            isActive={currentSection === "Friends"}
            path="/Friends"
            isLogOut={false}
            icon={FaUserFriends}
          />
          <NavItem
            key="Leaderboard"
            name="Leaderboard"
            setActive={setCurrentSection}
            isActive={currentSection === "Leaderboard"}
            path="/Leaderboard"
            isLogOut={false}
            icon={MdLeaderboard}
          />
          <NavItem
            key="Schedule"
            name="Schedule"
            setActive={setCurrentSection}
            isActive={currentSection === "Schedule"}
            path="/Schedule"
            isLogOut={false}
            icon={AiOutlineSchedule}
          />
        </ul>
      </nav>

      <div className="pb-4">
        <ul className="space-y-1 flex flex-col items-center">
          <NavItem
            key="Settings"
            name="Settings"
            setActive={setCurrentSection}
            isActive={currentSection === "Settings"}
            path="/Settings"
            isLogOut={false}
            icon={IoSettingsSharp}
          />
          <NavItem
            key="Logout"
            name="Logout"
            setActive={setCurrentSection}
            isActive={currentSection === "Logout"}
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
