const base = 'http://localhost:3000/';

export const pageGarage = (_page: number, _limit: number) => {
  return `${base}garage/?_page=${_page}&_limit=${_limit}`;
};
