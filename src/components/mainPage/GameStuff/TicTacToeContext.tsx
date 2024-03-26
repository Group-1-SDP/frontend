import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BoardsState } from './types';

interface TicTacToeContextType {
  boards: BoardsState;
  setBoards: React.Dispatch<React.SetStateAction<BoardsState>>;
}

const defaultState: TicTacToeContextType = {
  boards: {},
  setBoards: () => {},
};

const TicTacToeContext = createContext<TicTacToeContextType>(defaultState);

export const useTicTacToe = () => useContext(TicTacToeContext);

interface Props {
  children: ReactNode;
}

export const TicTacToeProvider: React.FC<Props> = ({ children }) => {
  const [boards, setBoards] = useState<BoardsState>({});

  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('ticTacToeBoards') || '{}');
    setBoards(savedBoards);
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeBoards', JSON.stringify(boards));
  }, [boards]);

  return (
    <TicTacToeContext.Provider value={{ boards, setBoards }}>
      {children}
    </TicTacToeContext.Provider>
  );
};