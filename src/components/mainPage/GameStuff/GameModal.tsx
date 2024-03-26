import React from "react";
import { ImCross } from "react-icons/im";
import TikTacToe from "./TicTacToe";

interface ModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  playerName: string;
}

const GameModal: React.FC<ModalProps> = ({
  modalVisible,
  closeModal,
  playerName,
}) => {
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
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            type="button"
          >
            <ImCross size={20} />
          </button>
          {modalVisible && <TikTacToe playerName={playerName} />}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
