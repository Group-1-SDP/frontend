import TopBar from "../components/Utils/TopBar";
import Settings from "../components/SettingsPage/Settings";
import { useState } from "react";

function SettingsPage() {
  return (
    <div>
      <TopBar />
      <Settings />
    </div>
  );
}

export default SettingsPage;
