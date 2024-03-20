import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// add props of an array with name and a react component
type Tab = {
  name: string;
  page: React.ReactNode;
};

function SelectionSlider(props: { tabs: Tab[] }) {
  const tabs = props.tabs;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className="w-full h-full rounded-xl">
      <nav className="">
        <ul>
          {tabs.map((item) => (
            <li
              key={item.name}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.name}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className="py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.name : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.page}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default SelectionSlider;
