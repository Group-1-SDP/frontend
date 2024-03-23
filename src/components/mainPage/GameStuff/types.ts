export type SquareStates = "X" | "O" | "";
export interface Board extends Array<Array<SquareStates>> {}

export interface BoardsState {
  [playerName: string]: Board;
}