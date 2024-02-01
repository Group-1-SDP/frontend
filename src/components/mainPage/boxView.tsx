import React from 'react'

function boxView() {
  return (
    <div>
      <div className="flex mx-5 px-3 my-7 py-3 items-center justify-center hover:bg-gray-300 transition-colors rounded-xl">
        <div className="bg-black rounded-full p-5"></div>
        <div className="px-2 font-semibold text-xl">
          <h1>{}</h1>
        </div>
      </div>
    </div>
  )
}

export default boxView