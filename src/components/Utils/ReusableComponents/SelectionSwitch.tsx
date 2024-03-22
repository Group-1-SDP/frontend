import React, { useState } from "react";
import { motion } from "framer-motion";

interface SelectionSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function SelectionSwitch({ value, onChange }: SelectionSwitchProps) {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    onChange(!isOn);
  };

  return (
    <div className="bg-black" data-isOn={isOn} onClick={handleToggle}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default SelectionSwitch;
