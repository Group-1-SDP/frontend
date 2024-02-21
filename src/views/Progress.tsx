import React from 'react'
import TopBar from "../components/Utils/TopBar.tsx"
import TotalToday from '../components/progress/TotalToday.tsx'

function Progress() {
  return (
    <div>
        <TopBar />  
        <div className="flex justify-center">
            <TotalToday />
        </div>
    </div>
  )
}

export default Progress