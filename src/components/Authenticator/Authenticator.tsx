import AuthenticatorNavigation from "./AuthenticatorNavigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { SectionAtom } from "./AuthenticatorStates";
import { useAtom } from "jotai";

function Authenticator() {
  const [section] = useAtom(SectionAtom);

  return (
    <div className="flex justify-end pr-28">
      <div className="relative dark:bg-colorE8E8E8 rounded-3xl shadow-2xl h-640px w-520px overflow-hidden pointer-events-auto">
        <div className="px-20 py-20">
          <AuthenticatorNavigation />
          {section === "Log in" && <LoginForm />}
          {section === "Sign Up" && <RegisterForm />}
        </div>
        <div className="absolute bg-color046244 rounded-full h-[640px] w-[640px] -left-[60%] -top-[88%]"></div>
        <div className="absolute bg-color188764 rounded-full h-[640px] w-[640px] -right-[60%] -bottom-[85%]"></div>
      </div>
    </div>
  );
}

export default Authenticator;
