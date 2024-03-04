import { useRef, useState } from 'react'
import Icon from '../components/Authenticator/Icon';
import Model from '../components/Utils/Model';
import LoginModal from '../components/Authenticator/LoginModal';
import ConnectButton from '../components/Authenticator/OpenModal';
import RegisterModal from '../components/Authenticator/RegisterModal';

const Authenticator = () => {
  const canvasRef = useRef(null);

  //Login Modal 
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const openLoginModal = () => {
    setLoginModalVisible(true);
    setRegisterModalVisible(false);
  };
  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  //Register Modal
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalVisible(true);
    setLoginModalVisible(false);
  };
  const closeRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  return (
    <>
    <div style={{ position: 'relative', zIndex: '1' }}>
      <Icon/>
      <div className="fixed inset-x-0 bottom-20 pb-20">
          <ConnectButton onClick={openLoginModal}/>
      </div>      
      <LoginModal loginModalVisible={loginModalVisible} closeLoginModal={closeLoginModal} openRegisterModal={openRegisterModal}/>
      <RegisterModal registerModalVisible={registerModalVisible} closeRegisterModal={closeRegisterModal} openLoginModal={openLoginModal}/> 
    </div>  
      <canvas ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-64 h-64">
      </canvas>
      <Model 
      canvasRef={canvasRef} 
      width={window.innerWidth} 
      height={window.innerHeight} 
      zCamPosition={4} 
      yCamPosition={1.5}
      FOV={50} />
    </>
  )
}

export default Authenticator
