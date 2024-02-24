import React from 'react'

interface ProfileBoxProps {
    name: string;
    username: string
}

function ProfileBox({ name, username }: ProfileBoxProps) {
  return (
    <div
      className={`p-4 m-4 rounded-md flex items-center justify-between hover:bg-gray-100 transition duration-300`}
    >
      <div className="flex items-center">
        <p className={`mr-2`}>{name}</p>
        <p className={`mr-2`}>{username}</p>
      </div>
    </div>
  )
}

export default ProfileBox