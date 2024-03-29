import * as pageTypes from '../../pages/types';
import { Sort, Order } from '../api/types';

export type RaceTrackConfiguration = {
  leftIndent: number;
  rightIndent: number;
  carWidth: number;
};

export type Garage = {
  limitCars: number;
  currentPage: number;
  totalCars: number;
  currentCarId: number;
  specialElements: pageTypes.SpecialElements;
  numberCarsToGenerate: number;
  raceTrackConfiguration: RaceTrackConfiguration;
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
