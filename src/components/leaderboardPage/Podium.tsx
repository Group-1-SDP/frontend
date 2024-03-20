import { motion } from "framer-motion";

export interface User {
  username: string;
  points: number;
}

interface PodiumProps {
  users: User[];
}

function Podium({ users }: PodiumProps) {
  return (
    <div className="flex justify-center items-baseline m-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center mr-10"
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#D1D5DB",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
          className="w-24 h-24 rounded-full bg-gray-400 mb-4"
        ></motion.div>
        <div className="font-semibold text-lg">{users[1].username}</div>
        <div>{users[1].points}</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center mr-10"
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#FACC15",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
          className="w-32 h-32 rounded-full bg-yellow-500 mb-4"
        ></motion.div>
        <div className="font-semibold text-lg">{users[0].username}</div>
        <div>{users[0].points}</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center"
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#C2410C",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
          className="w-24 h-24 rounded-full bg-orange-800 mb-4"
        ></motion.div>
        <div className="font-semibold text-lg">{users[2].username}</div>
        <div>{users[2].points}</div>
      </motion.div>
    </div>
  );
}

export default Podium;
