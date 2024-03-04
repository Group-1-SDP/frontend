import React from 'react'
import LeaderboardElement from './LeaderboardElement'
import { motion } from 'framer-motion'

const friends = [
    { username: 'Jonathan', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: true },
    { username: 'Matthieu', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Linus', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Dylan', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Lewis', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Cem', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Ross', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Lyle', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false },
    { username: 'Pavel', points: getRandomNumber(1, 20), total: getRandomNumber(100, 500), currentUser: false }
  ];
  
function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Leaderboard() {

    friends.sort((a, b) => b.total - a.total)

  return (
    <div className="flex justify-center">

    <div className='w-[800px]'>
      <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`p-4 m-4 rounded-md flex items-center justify-between`}
    >
      <div className="flex items-center">
        <p className={`mr-2`}>Username</p>
      </div>
      <div className="flex items-center">
        <p className="mr-10">Tasks 24hr</p>
        <p>Tasks Total</p>
      </div>
    </motion.div>
      {friends.map((friend, index) => (
        <LeaderboardElement key={index} friend={friend} />
      ))}
    </div>
    </div>
  )
}

export default Leaderboard