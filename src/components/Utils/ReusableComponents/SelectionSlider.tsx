import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// add props of an array with name and a react component
type Tab = {
  name: string;
  page: React.ReactNode;
};

function SelectionSlider(props: { tabs: Tab[] }) {
  const tabs = props.tabs;

  const [selectedTabName, setSelectedTabName] = useState(tabs[0].name);
  const selectedTab = tabs.find((tab) => tab.name === selectedTabName);

  return (
    <div className="w-full h-full rounded-xl">
      <nav className="">
        <ul>
          {tabs.map((item) => (
            <li
              key={item.name}
              className={`cursor-pointer ${
                item.name === selectedTabName ? "font-bold" : "font-medium"
              }`}
              onClick={() => setSelectedTabName(item.name)}
            >
              {`${item.name}`}
              {item.name === selectedTabName && (
                <motion.div
                  className="underline bg-black w-full"
                  layoutId="underline"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <main className="py-5">
        <AnimatePresence mode="wait">
          {selectedTab && (
            <motion.div
              key={selectedTab.name}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab.page}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default SelectionSlider;
