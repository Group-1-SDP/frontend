import { useRef, useState } from 'react'
import Icon from '../components/Authenticator/Icon';
import Model from '../components/Authenticator/Model';
import Modal from '../components/Authenticator/Modal';
import ConnectButton from '../components/Authenticator/OpenModal';

const Authenticator = () => {
  const canvasRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <div style={{ position: 'relative', zIndex: '1' }}>
      <Icon/>
      <div className="fixed inset-x-0 bottom-20 pb-20">
          <ConnectButton onClick={openModal}/>
      </div>
      <Modal modalVisible={modalVisible} closeModal={closeModal} /> 
    </div>  
      <canvas ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
      </canvas>
      <Model canvasRef={canvasRef} width={1920} height={1080} />
    </>
  )
}

export default Authenticator
