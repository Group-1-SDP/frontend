import React from 'react'
import Schedule from './Schedule'

export interface Event {
    name: string,
    slot: string,
    color: string
}

const events = [
    {name: "SDP", slot: "09:00", color: "project-1"},
    {name: "MLG", slot: "10:00", color: "project-2"},
    {name: "FNLP", slot: "11:00", color: "project-3"},
    {name: "Lunch", slot: "12:00", color: "break"},
    {name: "SDP", slot: "13:00", color: "project-1"},
]

function ScheduleWrapper() {
  return (
    <div className='my-4'>
        <h1>Schedule Form</h1>
        <Schedule events={events} />
    </div>
  )
}

export default ScheduleWrapper