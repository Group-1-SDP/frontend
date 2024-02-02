import React, { useState } from 'react'
import { ImCross } from 'react-icons/im';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

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
  
  <div className={`fixed left-0 top-0 ${(modalVisible) ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-1000 ease-in-out`}>
    <div className='bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-lg px-10 pt-5 pb-5 w-[30%]' style={{ position: 'relative' }}>
          <div className='flex-grow space-y-2'>
            <div className='flex justify-center'>
              <img src="https://placehold.co/120x80"/>
            </div>
            <form>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">TickBox ID</label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input type="text" id="large-input" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your TickBox ID'/>
                </div>
              </div>
              <div className="mb-6 relative">
                <label className="block mb-2 text-xl font-medium">Password</label>
                <div className="relative">
                    <RiLockPasswordLine size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input type="password" id="large-input" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your password'/>
                </div>
              </div>
              <div className='flex justify-center'>
              <button type="submit" className="text-white text-ml font-medium rounded-md px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700">
                Connect
              </button>
              </div>
            </form>
          </div>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 absolute top-3 right-3" type="button">
            <ImCross size={20}/>
          </button>
        </div>
    </div>
  </div>
  </>
  )
}

export default Authenticator