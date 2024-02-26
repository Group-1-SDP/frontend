import React from 'react'
import LeaderboardElement from './LeaderboardElement'

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
    <div className='mx-20'>
      {friends.map((friend, index) => (
        <LeaderboardElement key={index} friend={friend} />
      ))}
    </div>
  )
}

export default Leaderboard