import React from 'react'
import ProfileBox from './ProfileBox'
import StatBox from './StatBox'
import { usernameAtom } from '../Utils/GlobalState';
import { useAtom } from 'jotai';

function ProfileWrapper() {
  const [username] = useAtom(usernameAtom);

  const profile = {
    username: username,
    tasksSet: 50,
    tasksCompleted: 100,
    total: 1000
  }
  return (
    <div className='mx-20 flex justify-between'>
        <ProfileBox username={profile.username}/>
        <StatBox statName="Tasks Set" stat={profile.tasksSet} />
        <StatBox statName="Tasks Completed" stat={profile.tasksCompleted} />
        <StatBox statName="Total Points" stat={profile.total} />
    </div>
  )
}

export default ProfileWrapper