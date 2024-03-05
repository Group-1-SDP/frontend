import React from "react";
import { ImCross } from "react-icons/im";
import LoginForm from "./LoginModalForm";
import Logo from "../Utils/Logo";

interface LoginModalInterface {
  loginModalVisible: boolean;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
}

const LoginModal: React.FC<LoginModalInterface> = ({
  loginModalVisible,
  closeLoginModal,
  openRegisterModal,
}) => {
  return (
    <div
      className={`fixed left-0 top-0 ${
        loginModalVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center ">
        <div
          className="bg-white rounded-lg shadow-lg px-10 pt-5 pb-5 w-[30%]"
          style={{ position: "relative" }}
        >
          <div className="flex-grow">
            <div className="flex justify-center">
              <Logo height="50px" />
            </div>
            <div className="text-4xl font-bold">Login</div>
            <LoginForm />
            <div className="flex justify-center text-base">
              Dont have an account? &nbsp;
              <button className="text-blue-700" onClick={openRegisterModal}>
                Sign Up
              </button>
            </div>
          </div>
          <button
            onClick={closeLoginModal}
            className="text-gray-600 hover:text-gray-800 absolute top-3 right-3"
            type="button"
          >
            <ImCross size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
