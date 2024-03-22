import React from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  modalVisible: boolean;
  closeModal: () => void;
}

const GameModal: React.FC<ModalProps> = ({ modalVisible, closeModal }) => {
  return (
    <div
      className={`fixed left-0 top-0 ${
        modalVisible
          ? "opacity-100 transition-opacity duration-5 ease-in-out visible"
          : "opacity-0 invisible"
      }`}
    >
      <div className="bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center">
        <div
          className="bg-white rounded-lg shadow-lg px-10 py-10"
          style={{ position: "relative" }}
        >
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800"
            type="button"
          >
            <ImCross size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
