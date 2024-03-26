import React, { useState } from "react";
import AccountSettings from "./Tabs/AccountSettings";
import Modules from "./Tabs/Modules";
import StudyPlan from "./Tabs/StudyPlan";
import { motion, AnimatePresence } from "framer-motion";
import "./MovingUnderline.css"
import SelectionSlider from "../Utils/ReusableComponents/SelectionSlider";

const settingsTabs = [
  { name: "Account Settings", page: <AccountSettings /> },
  { name: "Modules", page: <Modules /> },
  { name: "Study Plan", page: <StudyPlan /> },
];

function SettingsWrapper() {
  const [selectedTab, setSelectedTab] = useState(settingsTabs[0]);
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex items-center w-[1135px] h-[800px] bg-white rounded-xl">
        <SelectionSlider tabs={settingsTabs} />
      </div>
    </div>
  );
}

export default SettingsWrapper;
