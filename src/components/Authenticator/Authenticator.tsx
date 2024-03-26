import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Icon from "./Icon";
import SelectionSlider from "../Utils/ReusableComponents/SelectionSlider";

function Authenticator() {
  const tabs = [
    { name: "Log In", page: <LoginForm />},
    { name: "Sign Up", page: <RegisterForm />},
  ];
  

  return (
    <div className="top-24 pl-28">
      <div className="flex justify-center w-full h-[128px]">
      <Icon />
      </div>
      <div className="relative bg-colorE8E8E8 rounded-3xl shadow-2xl h-640px w-520px overflow-hidden pointer-events-auto">
        <div>
          <div className="py-20 mx-20">
            <SelectionSlider tabs={tabs} />
          </div>

        </div>
        <div className="absolute bg-color046244 rounded-full h-[640px] w-[640px] -left-[60%] -top-[88%]"></div>
        <div className="absolute bg-color188764 rounded-full h-[640px] w-[640px] -right-[60%] -bottom-[85%]"></div>
      </div>
    </div>
  );
}

export default Authenticator;
