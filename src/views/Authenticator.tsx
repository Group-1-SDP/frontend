import { useRef, useState } from "react";
import Icon from "../components/Authenticator/Icon";
import Model from "../components/Utils/Model";
import LoginModal from "../components/Authenticator/LoginModal";
import ConnectButton from "../components/Authenticator/OpenModal";
import RegisterModal from "../components/Authenticator/RegisterModal";

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
  );
};

export default Authenticator;
