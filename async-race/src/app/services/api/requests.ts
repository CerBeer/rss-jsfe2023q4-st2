import { Sort, Order } from './types';

const base = 'http://localhost:3000/';

export const pageGarage = (_page: number, _limit: number) => {
  return `${base}garage/?_page=${_page}&_limit=${_limit}`;
};

export const pageWinners = (_page: number, _limit: number, _sort: Sort, _order: Order) => {
  return `${base}winners/?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`;
};

export const getCar = (id: number) => {
  return `${base}garage/?id=${id}`;
};
