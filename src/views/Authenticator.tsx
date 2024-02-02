import { useState } from 'react'
import Icon from '../components/Authenticator/Icon';
import Image from '../components/Authenticator/Image';
import Modal from '../components/Authenticator/Modal';
import ConnectButton from '../components/Authenticator/ConnectButton';

const Authenticator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
  <>
    <div className='space-y-20'>
      <Icon/>

      <div className='space-y-5'>
        <Image/>

        <div className='flex justify-center'>
          <ConnectButton onClick={openModal}/>
        </div>
      </div>
    </div>

    <Modal modalVisible={modalVisible} closeModal={closeModal} />
  </>
  )
}

export default Authenticator