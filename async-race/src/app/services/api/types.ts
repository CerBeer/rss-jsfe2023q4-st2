export type Car = {
  name: string;
  color: string;
  id: number;
};

export type NewCar = {
  name: string;
  color: string;
};

export type Cars = [car: Car];

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type AllWinners = [winner: Winner];

export type Sort = 'id' | 'wins' | 'time';

export type Order = 'ASC' | 'DESC';

export type EngineStates = {
  velocity: number;
  distance: number;
};
