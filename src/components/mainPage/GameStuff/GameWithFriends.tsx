import React from "react";

interface GameInterface {
  name: string;
  gameType: string;
  gameState: string;
  isHeading: boolean;
}

const GameItem: React.FC<GameInterface> = ({
  name,
  gameType,
  gameState,
  isHeading,
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
  return (
    <div className="w-[600px] h-[365px] shadow-sm bg-white rounded-xl">
      <h1 className="font-bold text-[22px] pt-6 pl-6">Recent Games</h1>
      <ul className="space-y-1 flex flex-col items-center overflow-auto max-h-[290px]">
        <GameItem
          name="User"
          gameType="Game"
          gameState="Game State"
          isHeading={true}
        />
        <GameItem
          name="Dylan"
          gameType="Tic-Tac-Toe"
          gameState="Play"
          isHeading={false}
        />
        <GameItem
          name="Ross"
          gameType="Connect Fo"
          gameState="Play"
          isHeading={false}
        />
        <GameItem
          name="Jonathan"
          gameType="Tic-Tac-Toe"
          gameState="Finished"
          isHeading={false}
        />
        <GameItem
          name="Matthieu"
          gameType="Connect Fo"
          gameState="Play"
          isHeading={false}
        />
        <GameItem
          name="wife"
          gameType="Connect Fo"
          gameState="Play"
          isHeading={false}
        />
      </ul>
    </div>
  );
}

export default GameWithFriends;
