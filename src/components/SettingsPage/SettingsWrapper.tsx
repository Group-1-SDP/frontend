import React, { useState } from "react";
import AccountSettings from "./Tabs/AccountSettings";
import LoginSecurity from "./Tabs/LoginSecurity";
import Modules from "./Tabs/Modules";
import StudyPlan from "./Tabs/StudyPlan";
import { motion, AnimatePresence } from "framer-motion";
import "./MovingUnderline.css"
import SelectionSlider from "../Utils/ReusableComponents/SelectionSlider";

const settingsTabs = [
  { name: "Account Settings", page: <AccountSettings /> },
  { name: "Login & Security", page: <LoginSecurity /> },
  { name: "Modules", page: <Modules /> },
  { name: "Study Plan", page: <StudyPlan /> },
];

function SettingsWrapper() {
  const [selectedTab, setSelectedTab] = useState(settingsTabs[0]);
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex w-[1135px] h-[640px] bg-white rounded-xl">
        <SelectionSlider tabs={settingsTabs} />
      </div>
    </div>
  );
}

export default SettingsWrapper;
