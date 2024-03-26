import { States } from '../../services/stateManager/types';

export const states: States = {
  header: {
    specialElements: {},
  },
  garage: {
    limitCars: 7,
    currentPage: 1,
    totalCars: 0,
    currentCarId: 0,
    specialElements: {},
  },
  winners: {
    limitCars: 2,
    totalCars: 0,
    currentPage: 1,
    specialElements: {},
    sort: 'time',
    order: 'ASC',
  },
};
