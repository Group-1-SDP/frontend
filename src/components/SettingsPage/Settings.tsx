import AccountsForm from "./AccountsForm";
import Navigation from "./SettingsNavigation";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteUserForm from "./DeleteUserForm";
import { useAtom } from "jotai";
import { currentSectionAtom } from "./SettingsStates";

function Settings() {
  const [activeSection] = useAtom(currentSectionAtom);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex p-12 rounded-xl shadow-2xl w-full max-w-6xl">
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
          <div className="w-3/4 pl-6">
            <DeleteUserForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
