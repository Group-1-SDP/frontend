import React, { useState } from "react";
import { motion } from "framer-motion";

interface InputSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function InputSwitch({ value, onChange }: InputSwitchProps) {
  const [isOn, setIsOn] = useState(false);


  return (
    <div className="">
      <div
        className={`cursor-pointer	w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 ${
          value ? 'bg-greenAccent justify-end' : 'justify-start'
        }`}
        onClick={() => onChange(!value)}
      >
        <motion.div
          layout
          className="bg-white w-4 h-4 rounded-full shadow-md"
        ></motion.div>
      </div>
    </div>
  );
}


export default InputSwitch;
