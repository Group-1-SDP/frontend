import React from 'react'

interface StatBoxProps {
    statName: string;
    stat: number;
}

function StatBox({ statName, stat }: StatBoxProps) {
  return (
    <div
      className={`p-4 m-4 rounded-md flex items-center justify-between hover:bg-gray-100 transition duration-300`}
    >
      <div className="flex items-center">
        <p className={`mr-2`}>{statName}</p>
        <p className={`mr-2`}>{stat}</p>
      </div>
    </div>
  )
}

export default StatBox