import React, { useState, useEffect } from "react";
import { useTicTacToe } from "./TicTacToeContext";
import { Board, Player } from "./types";

interface TikTakToeProps {
  playerName: string;
}

const calculateWinner = (board: Player[]): Player => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return "";
};

const TikTakToe: React.FC<TikTakToeProps> = ({ playerName }) => {
  const { boards, setBoards } = useTicTacToe();
  const [player, setPlayer] = useState<Player>("X");

  const initialBoard: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  useEffect(() => {
    if (!boards[playerName]) {
      setBoards((prev) => ({ ...prev, [playerName]: initialBoard }));
    }
  }, [playerName, boards, setBoards]);

  const makeMove = (x: number, y: number) => {
    const currentBoard = boards[playerName];
    if (!currentBoard) return;

    const currentWinner = calculateWinner(currentBoard.flat());
    if (currentWinner || currentBoard[x][y]) return;

    const newBoard = currentBoard.map((row, ri) =>
      row.map((cell, ci) => (ri === x && ci === y ? player : cell))
    );

    setBoards((prev) => ({ ...prev, [playerName]: newBoard }));
    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setBoards((prev) => ({ ...prev, [playerName]: initialBoard }));
    setPlayer("X");
  };

  const currentBoard = boards[playerName] || initialBoard;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold uppercase mb-8">Tic Tac Toe</h1>
      <div className="mb-4">Player {player}'s turn</div>
      <div className="grid grid-cols-3 gap-3">
        {currentBoard.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`w-24 h-24 border flex items-center justify-center cursor-pointer border-gray-800 bg-gray-300 text-3xl ${
                cell === "X" ? "text-pink-500" : "text-blue-500"
              }`}
              onClick={() => makeMove(x, y)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {calculateWinner(currentBoard.flat()) && (
        <div className="text-2xl font-bold my-4">
          Player '{calculateWinner(currentBoard.flat())}' wins!
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-pink-500 text-white uppercase rounded hover:bg-pink-600 transition duration-300"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
};

export default TikTakToe;
