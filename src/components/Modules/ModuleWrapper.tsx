import React from 'react'
import ModuleCodeInput from './ModuleCodeInput'

function ModuleWrapper() {
  return (
    <div className='flex flex-col items-center space-y-5'>
        <img src="https://placehold.co/600x400"/>
        <ModuleCodeInput />
    </div>
  )
}

export default ModuleWrapper