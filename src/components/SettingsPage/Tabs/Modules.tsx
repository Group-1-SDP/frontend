import React, { useState, useRef, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import InputBox from "../../Utils/ReusableComponents/InputBox";
import { AnimatePresence, motion } from "framer-motion";
import Model from "../../Utils/Model";
import SelectionSwitch from "../../Utils/ReusableComponents/SelectionSwitch";

const ConnectBox = () => {
  const [showConnection, setShowConnection] = useState(true);
  const [boxCode, setBoxCode] = useState("");
  const inputRef = useRef(null);

  const toggleConnection = () => {
    setShowConnection((prevState) => !prevState);
  };

  return (
    <div className="py-[45px]">
      <h1 className="text-xl font-semibold">Connect Your Box</h1>
      <AnimatePresence mode="wait">
        <div className="flex w-[640px] h-[120px] border-black border-dashed border items-center justify-center bg-gray-100 px-20 py-15 rounded-xl text-2xl">
          {showConnection ? (
            <motion.button
              key="initial"
              onClick={toggleConnection}
              className="w-full h-full flex items-center justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center">
                <IoIosAdd className="text-4xl" />
                <p className="ml-5">Add a new module</p>
              </div>
            </motion.button>
          ) : (
            <motion.button
              key="connect"
              className="w-full h-full flex items-center justify-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center">
                <InputBox
                  value={boxCode}
                  placeholder="Box Code"
                  onChange={setBoxCode}
                />
                <button className="bg-greenAccent text-sm text-white px-4 py-3 rounded-xl">
                  Connect
                </button>
              </div>
            </motion.button>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const ModuleCard = () => {
  const canvasRef = useRef(null);

  const [notfictionDetection, setNotificationDetection] = useState(false);
  const [tickagotchiMode, setTickagotchiMode] = useState(false);

  return (
    <div>
      <h1>Your Box</h1>
      <div className="w-[640px] py-10 border-black border-dashed border items-center justify-center bg-gray-100 px-20 py-15 rounded-xl text-2xl">
        <div className="flex flex-col items-center justify-center">
          <canvas ref={canvasRef} className=""></canvas>
          <Model
            canvasRef={canvasRef}
            width={400}
            height={100}
            zCamPosition={10}
            yCamPosition={10}
            FOV={20}
            mirror={true}
            rotateY={-0.3}
          />
        </div>
        <div className="text-xl font-semibold">
          <h1>Box Number: AA4457</h1>
          <div>
            <h1>Enable Notification Detection</h1>
            <SelectionSwitch value={notfictionDetection} onChange={setNotificationDetection}/>
          </div>
          <div>
            <h1>Enable Tickagotchi Mode</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

function Modules() {
  const [boxConnected, setBoxConnected] = useState(true);
  return (
    <div className="w-full h-full flex flex-col items-center">
      {boxConnected ? <ModuleCard /> : <ConnectBox />}
    </div>
  );
}

export default Modules;
