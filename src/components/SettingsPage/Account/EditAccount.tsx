import AccountsForm from "./AccountsForm";
import Navigation from "./Navigation";

function Settings() {
  return (
    <div className="flex justify-center items-center ">
      <div></div>
      <div className="dark:bg-gray-0 flex p-12 rounded-xl shadow-6xl w-full max-w-7xl">
        <Navigation />
        <AccountsForm />
      </div>
    </div>
  );
}

export default Settings;
