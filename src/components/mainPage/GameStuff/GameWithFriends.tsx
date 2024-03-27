import React, { useState } from "react";
import GameModal from "./GameModal";
import { TicTacToeProvider } from "./TicTacToeContext";
import { useAtom } from "jotai";
import { rewardAvailableAtom } from "../../Utils/GlobalState";

interface GameInterface {
  name: string;
  gameType: string;
  gameState: string;
  isHeading: boolean;
  openModal?: () => void;
}

const GameItem: React.FC<GameInterface> = ({
  name,
  gameType,
  gameState,
  isHeading,
  openModal,
}) => {
  if (!isHeading) {
    return (
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex w-40 h-12 justify-start items-center">{name}</div>
        <div className="flex w-40 h-12 justify-start items-center">
          {gameType}
        </div>
        <button
          type="submit"
          disabled={gameState !== "Play"}
          onClick={openModal}
          className={`text-white text-lg font-medium py-2 rounded-lg text-center ${
            gameState === "Play"
              ? "dark:bg-color188764 dark:hover:bg-color046244 text-white font-bold"
              : "dark:bg-gray-400 text-white font-bold"
          }`}
        >
          {gameState}
        </button>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-4 items-center font-semibold">
        <div className="flex w-40 h-12 justify-start items-center">{name}</div>
        <div className="flex w-40 h-12 justify-start items-center">
          {gameType}
        </div>
        <div className="flex w-40 h-12 justify-center items-center">
          {gameState}
        </div>{" "}
      </div>
    );
  }
};

function GameWithFriends() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [makeMove] = useAtom(rewardAvailableAtom);

  const openModal = (playerName: string) => {
    setCurrentPlayer(playerName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TicTacToeProvider>
      <div className="w-[600px] h-[365px] shadow-sm bg-white rounded-xl">
        <h1 className="font-bold text-[22px] pt-6 pl-6 pb-4">Recent Games</h1>
        <ul className="space-y-1 flex flex-col items-center overflow-auto max-h-[290px] px-4">
          <GameItem
            name="User"
            gameType="Game"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={true}
          />
          <GameItem
            name="Dylan"
            gameType="Tic-Tac-Toe"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={false}
            openModal={() => openModal("Dylan")}
          />
          <GameItem
            name="Ross"
            gameType="Tic-Tac-Toe"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={false}
            openModal={() => openModal("Ross")}
          />
          <GameItem
            name="Jonathan"
            gameType="Tic-Tac-Toe"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={false}
            openModal={() => openModal("Jonathan")}
          />
          <GameItem
            name="Matthieu"
            gameType="Tic-Tac-Toe"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={false}
            openModal={() => openModal("Matthieu")}
          />
          <GameItem
            name="wife"
            gameType="Tic-Tac-Toe"
            gameState={makeMove ? "Play" : "Do Work"}
            isHeading={false}
            openModal={() => openModal("wife")}
          />
        </ul>
        <GameModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          playerName={currentPlayer}
        />
      </div>
    </TicTacToeProvider>
  );
}

export default GameWithFriends;
