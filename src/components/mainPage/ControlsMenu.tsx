import React from 'react'
import ControlMenuButton from './ControlMenuButton'

function controlsMenu() {
  return (
    <div className="px-[250px] items-center flex">
      <div className='text-left flex-auto'>
        <ControlMenuButton menuName="See To-Do List"/>
        <ControlMenuButton menuName="Set Timer"/>
        <ControlMenuButton menuName="See Past Goals"/>
      </div>
      <div>
        <img src="https://placehold.co/600x400" ></img>
      </div>
    </div>
  )
}

export default controlsMenu