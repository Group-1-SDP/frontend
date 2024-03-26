import LeaderboardElement from './LeaderboardElement'

export interface User {
  username: string;
  points: number;
  currentUser: boolean;
}

interface LeaderboardProps {
  users: User[];
}

function Leaderboard({ users }: LeaderboardProps) {

  return (
    <div className="flex justify-center">

    <div className='w-[800px]'>
      {/* <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`p-4 m-4 rounded-md flex items-center justify-between`}
    >
    </motion.div> */}
      {users.map((user, index) => (
        <LeaderboardElement key={index} user={user} />
      ))}
    </div>
    </div>
  )
}

export default Leaderboard