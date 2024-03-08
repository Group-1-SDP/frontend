import { useAtom } from "jotai";
import { SectionAtom } from "./AuthenticatorStates";

interface NavInterface {
  name: string;
  setActive: (name: string) => void;
  isActive: boolean;
}

function NavItem({ name, setActive, isActive }: NavInterface) {
  return (
    <li
      className={`mb-6 cursor-pointer ${
        isActive
          ? " font-bold underline"
          : " font-medium"
      }`}
      onClick={() => setActive(name)}
    >
      {name}
    </li>
  );
}

function generateNavItems(
  navItems: any,
  setCurrentSection: (name: string) => void
) {
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

function AuthenticatorNavigation() {
  const [currentSection, setCurrentSection] = useAtom(SectionAtom);

  const navItems = [
    { name: "Log in", isActive: currentSection === "Log in" },
    { name: "Sign Up", isActive: currentSection === "Sign Up" },
  ];

  return (
    <nav className="text-3xl flex justify-center">
      <ul className="flex space-x-20">
        {generateNavItems(navItems, setCurrentSection)}
      </ul>
    </nav>
  );
}

export default AuthenticatorNavigation;
