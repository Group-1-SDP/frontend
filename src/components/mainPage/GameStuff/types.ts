export type Player = "X" | "O" | "";
export interface Board extends Array<Array<Player>> {}

export interface BoardsState {
  [playerName: string]: Board;
}