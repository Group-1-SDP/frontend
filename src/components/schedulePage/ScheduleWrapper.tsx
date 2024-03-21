import React from 'react'
import Schedule from './Schedule'

export interface Event {
    name: string,
    slot: string,
    color: string
}

const events = [
    {name: "SDP", slot: "9am", color: "project-1"},
    {name: "MLG", slot: "10am", color: "project-2"},
    {name: "FNLP", slot: "11am", color: "project-3"},
    {name: "Lunch", slot: "12pm", color: "break"},
    {name: "SDP", slot: "1pm", color: "project-1"},
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