export type Garage = {
  limitCars: number;
  currentPage: number;
  currentCarId: number;
};

export type Winners = {
  limitCars: number;
  currentPage: number;
};

export type States = {
  garage: Garage;
  winners: Winners;
};
