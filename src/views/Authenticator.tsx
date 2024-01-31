import React, { useState } from 'react'
import { ImCross } from "react-icons/im";

const Authenticator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
  <>
  <div className='space-y-20'>
    <div className = "p-5 flex justify-end text-6xl font-medium">
        TickBox
    </div>

    <div className='space-y-5'>
      <div className='flex justify-center'>
        <img src="https://placehold.co/600x400"/>
      </div>

      <div className='flex justify-center'>
        <button onClick={toggleModal} className="text-white text-2xl font-medium rounded-md px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700" type="button">
          Connect to Box
        </button>
      </div>
    </div>
  </div>
  
  <div className={`fixed left-0 top-0 ${(modalVisible) ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-400 ease-in-out`}>
    <div className='bg-black bg-opacity-45 w-screen h-screen flex items-center justify-center'>
        <div className='bg-white rounded shadow-md p-8 w-[40%]' style={{ position: 'relative' }}>
          <div className='flex-grow'>
            <div className="mb-6">
              <label className="block mb-2 text-xl font-medium">Name</label>
              <input type="text" id="large-input" className="block w-full p-4 rounded-lg  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='John'/>
            </div>
          </div>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 focus:outline-none justify-end absolute top-0 right-0 h-7 w-6" type="button">
            <ImCross/>
          </button>
        </div>
    </div>
  </div>
  </>
  )
}

export default Authenticator