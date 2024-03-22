import React, { useState, useEffect } from "react";

type Player = "X" | "O" | "";
interface Board extends Array<Array<Player>> {}

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

const TikTakToe: React.FC = () => {
  const initialBoard: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = useState<Board>(initialBoard);
  const [player, setPlayer] = useState<Player>("X");

  useEffect(() => {
    const currentWinner = calculateWinner(board.flat());
    if (currentWinner || player === "X") return;

    const makeBotMove = () => {
      const availableMoves: Array<[number, number]> = [];
      board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell === "") {
            availableMoves.push([rowIndex, cellIndex]);
          }
        });
      });

      if (availableMoves.length === 0) return;

      const randomMoveIndex = Math.floor(Math.random() * availableMoves.length);
      const [x, y] = availableMoves[randomMoveIndex];

      setTimeout(() => makeMove(x, y), 200); 
    };

    makeBotMove();
  }, [board, player]);

  const makeMove = (x: number, y: number) => {
    const currentWinner = calculateWinner(board.flat());
    if (currentWinner || board[x][y]) return;

    const newBoard = board.map((row, ri) =>
      row.map((cell, ci) => (ri === x && ci === y ? player : cell))
    );
    setBoard(newBoard);
    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setPlayer("X");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold uppercase mb-8">Tic Tac Toe</h1>
      <div className="mb-4">Player {player}'s turn</div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((row, x) =>
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
      {calculateWinner(board.flat()) && (
        <div className="text-2xl font-bold my-4">Player '{calculateWinner(board.flat())}' wins!</div>
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
