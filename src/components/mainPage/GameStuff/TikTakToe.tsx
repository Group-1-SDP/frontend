import React, { useState, useEffect } from "react";
import { useTicTacToe } from "./TicTacToeContext";
import { Board, Player } from "./types";
import { usernameAtom } from "../../Utils/GlobalState";
import { useAtom } from "jotai";

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
  const [username] = useAtom(usernameAtom);

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

  useEffect(() => {
    if (player === "O" && !calculateWinner(boards[playerName].flat() || initialBoard.flat())) {
      setTimeout(() => makeBotMove(), 500);
    }
  }, [player, boards, playerName]);

  const makeBotMove = () => {
    const currentBoard = boards[playerName] || initialBoard;
    let emptyCells: number[][] | [any, any][] = [];
    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === "") {
          emptyCells.push([rowIndex, cellIndex]);
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
      const [x, y] = emptyCells[randomCellIndex];
      makeMove(x, y, "O");
    }
  };

  const makeMove = (x: number, y: number, currentPlayer = player) => {
    const currentBoard = boards[playerName] || initialBoard;
    if (currentBoard[x][y] || calculateWinner(currentBoard.flat())) return;

    const newBoard = currentBoard.map((row, ri) =>
      row.map((cell, ci) => (ri === x && ci === y ? currentPlayer : cell))
    );

    setBoards((prev) => ({ ...prev, [playerName]: newBoard }));
    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setBoards((prev) => ({ ...prev, [playerName]: initialBoard }));
    setPlayer("X");
  };

  const currentBoard = boards[playerName] || initialBoard;
  const winner = calculateWinner(currentBoard.flat());

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold uppercase mb-8">Tic Tac Toe</h1>
      <div className="mb-4 text-xl">
        {player === "X" ? username : playerName}'s turn
      </div>
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
          {winner === "X" ? username : playerName} wins!
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
