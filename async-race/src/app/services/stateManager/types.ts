import * as pageTypes from '../../pages/types';

export type Garage = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  currentCarId: number;
  specialElements: pageTypes.SpecialElements;
};

export type Winners = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  specialElements: pageTypes.SpecialElements;
};

export type Header = {
  specialElements: pageTypes.SpecialElements;
};

export type States = {
  garage: Garage;
  winners: Winners;
  header: Header;
};
