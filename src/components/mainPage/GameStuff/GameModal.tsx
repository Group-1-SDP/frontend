import React from 'react'

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
          className="bg-white rounded-lg shadow-lg px-10 pt-5 pb-5 w-[30%]"
          style={{ position: "relative" }}
        >
          <div className="flex-grow space-y-2">
          </div>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800 absolute top-3 right-3"
            type="button"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default GameModal