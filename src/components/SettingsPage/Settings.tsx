import AccountsForm from "./AccountsForm";
import Navigation from "./Navigation";
import { atom, useAtom } from "jotai";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteUserForm from "./DeleteUserForm";

export const currentSectionAtom = atom("Account");

function Settings() {
  const [activeSection] = useAtom(currentSectionAtom);

  return (
    <div className="flex justify-center items-center ">
      <div className="dark:bg-gray-0 flex p-12 rounded-xl shadow-6xl w-full max-w-7xl">
        <Navigation />

        {activeSection === "Account" && (
          <div className="w-3/4 pl-6">
            <AccountsForm />
          </div>
        )}

        {activeSection === "Password" && (
          <div className="w-3/4 pl-6">
            <ChangePasswordForm />
          </div>
        )}

        {activeSection === "Delete Account" && (
          <div className="w-3/4 pl-6"><DeleteUserForm/></div>
        )}
      </div>
    </div>
  );
}

export default Settings;
