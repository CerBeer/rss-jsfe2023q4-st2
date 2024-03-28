import * as pageTypes from '../../pages/types';
import { Sort, Order } from '../api/types';

export type Garage = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  currentCarId: number;
  specialElements: pageTypes.SpecialElements;
  numberCarsToGenerate: number;
};

export type Winners = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  specialElements: pageTypes.SpecialElements;
  sort: Sort;
  order: Order;
};

export type Header = {
  specialElements: pageTypes.SpecialElements;
};

export type States = {
  garage: Garage;
  winners: Winners;
  header: Header;
};
