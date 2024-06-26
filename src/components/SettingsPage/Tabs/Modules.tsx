import React, { useState, useRef, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import InputBox from "../../Utils/ReusableComponents/InputBox";
import { AnimatePresence, motion } from "framer-motion";
import Model from "../../Utils/Model";
import InputSwitch from "../../Utils/ReusableComponents/InputSwitch";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { APILink } from "../../Utils/GlobalState";

interface ConnectBoxProps {
  sendConnection: (boxCode: string) => void;
}

const ConnectBox = ({ sendConnection }: ConnectBoxProps) => {
  const [showConnection, setShowConnection] = useState(true);
  const [boxCode, setBoxCode] = useState("");
  const inputRef = useRef(null);

  const toggleConnection = () => {
    setShowConnection((prevState) => !prevState);
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="">
        <h1 className="py-3 text-xl font-bold">Connect Your Box</h1>
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
                  <button
                    onClick={() => sendConnection(boxCode)}
                    className="bg-greenAccent text-sm text-white px-4 py-3 rounded-xl"
                  >
                    Connect
                  </button>
                </div>
              </motion.button>
            )}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface ModuleCardProps {
  disconnectBox: () => void;
}

const ModuleCard = ({ disconnectBox }: ModuleCardProps) => {
  const canvasRef = useRef(null);

  const [notfictionDetection, setNotificationDetection] = useState(false);
  const [tickagotchiMode, setTickagotchiMode] = useState(false);
  const [customWords, setCustomWords] = useState("");
  const [apiResponse, setAPIResponse] = useState("");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(APILink + "/api/box-settings");
        const data = await response.json();
        setNotificationDetection(data.notificationDetection);
        setTickagotchiMode(data.tickagotchiMode);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);

  const saveChanges = async () => {
    try {
      await fetch(APILink + "/api/tickagotchi-changed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAPIResponse("Changes saved successfully!");
    } catch (error) {
      setAPIResponse("Failed to save changes. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="py-3 flex justify-between items-center">
        <h1 className="font-bold text-xl">Your Box</h1>
        <AiOutlineCloseCircle
          onClick={disconnectBox}
          className="text-red-500 text-3xl"
        />
      </div>
      <div className="w-[640px] py-10 border-black border-dashed border items-center justify-center bg-gray-100 px-20 rounded-xl relative">
        <div className="flex flex-col items-center justify-center">
          <div className="top-[20px]">
            <canvas ref={canvasRef} className=""></canvas>
            <Model
              canvasRef={canvasRef}
              width={400}
              height={100}
              zCamPosition={10}
              yCamPosition={10}
              FOV={20}
              rotateY={0.3}
            />
          </div>
        </div>
        <div className="block space-y-3 pt-20 mt-4">
          <div className="py-2 px-3 rounded-xl bg-gray-200">
            <h1>Box Number: AA4457</h1>
          </div>
          <div className="flex items-center justify-between w-full py-2 px-3 rounded-xl bg-gray-200">
            <h1>Enable Notification Detection</h1>
            <InputSwitch
              value={notfictionDetection}
              onChange={setNotificationDetection}
            />
          </div>
          <div>
            <h1>Enter notifications you want Tickbox to inform you about.</h1>
            <InputBox
              value={customWords}
              placeholder="Custom Notification Words"
              onChange={setCustomWords}
            />
          </div>
          <div className="flex items-center justify-between w-full py-2 px-3 rounded-xl bg-gray-200">
            <h1>Enable Tickagotchi Mode</h1>
            <InputSwitch
              value={tickagotchiMode}
              onChange={setTickagotchiMode}
            />
          </div>
          <button
            className="flex items-center justify-center w-full py-2 px-3 rounded-xl bg-greenAccent text-white"
            onClick={saveChanges}
          >
            Save Changes
          </button>
          <div>
            {apiResponse}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Modules() {
  const [boxConnected, setBoxConnected] = useState(true);

  const disconnectBox = () => {
    setBoxConnected(false);
  };

  const sendConnection = (boxCode: string) => {
    setBoxConnected(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {boxConnected ? (
          <ModuleCard disconnectBox={disconnectBox} />
        ) : (
          <ConnectBox sendConnection={sendConnection} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modules;
