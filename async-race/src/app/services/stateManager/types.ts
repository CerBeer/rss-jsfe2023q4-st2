export type Garage = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  currentCarId: number;
};

export type Winners = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
};

export type States = {
  garage: Garage;
  winners: Winners;
};
