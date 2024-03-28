import { Sort, Order, Car, NewCar } from './types';

const base = 'http://127.0.0.1:3000/';

export const pageGarage = (_page: number, _limit: number) => {
  return `${base}garage?_page=${_page}&_limit=${_limit}`;
};

export const pageWinners = (_page: number, _limit: number, _sort: Sort, _order: Order) => {
  return `${base}winners?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`;
};

export const getCar = (id: number) => {
  return `${base}garage/${id}`;
};

export const getWinner = (id: number) => {
  return fetch(`${base}winners/${id}`);
};

export const getWinners = () => {
  return fetch(`${base}winners`);
};

export const deleteCar = (id: number) => {
  return fetch(`${base}garage/${id}`, {
    method: 'DELETE',
  });
};

export const deleteWinner = (id: number) => {
  return fetch(`${base}winners/${id}`, {
    method: 'DELETE',
  });
};

export const updateCar = (car: Car) => {
  return fetch(`${base}garage/${car.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: car.name,
      color: car.color,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const createCar = (car: NewCar) => {
  return fetch(`${base}garage`, {
    method: 'POST',
    body: JSON.stringify({
      name: car.name,
      color: car.color,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
