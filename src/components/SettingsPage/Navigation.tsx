import { useAtom } from "jotai";
import { currentSectionAtom } from "./Settings";

interface NavInterface {
  name: string;
  setActive: (name: string) => void;
  isActive: boolean;
}

function NavItem({
  name,
  setActive,
  isActive,
}: NavInterface) {
  return (
    <li
      className={`mb-6 cursor-pointer ${
        isActive ? "text-blue-500 font-bold" : "text-gray-800 font-medium"
      }`}
      onClick={() => setActive(name)}
    >
      {name}
    </li>
  );
}

function generateNavItems(navItems: any, setCurrentSection: (name: string) => void) {
  const navStuff = [];

  for (const item of navItems) {
    navStuff.push(
      <NavItem
        key={item.name}
        name={item.name}
        setActive={setCurrentSection}
        isActive={item.isActive}
      />
    );
  }

  return navStuff;
}


function Navigation() {
  const [currentSection, setCurrentSection] = useAtom(currentSectionAtom);

  const navItems = [
    { name: "Account", isActive: currentSection === "Account" },
    { name: "Password", isActive: currentSection === "Password" },
    { name: "Delete Account", isActive: currentSection === "Delete Account" },
  ];

  return (
    <div className="w-1/4">
      <h2 className="text-4xl font-bold mb-10">Settings</h2>
      <nav className="text-xl">
        <ul>{generateNavItems(navItems, setCurrentSection)}</ul>
      </nav>
    </div>
  );
}

export default Navigation;
