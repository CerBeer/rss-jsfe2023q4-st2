import { SpecialElements } from '../types';
import { AllWinners, Sort, Order } from '../../services/api/types';
import { Winners } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { TableLine } from './tableLine';

class RacePool {
  private location: HTMLElement;

  private states: Winners;

  private tableLines: TableLine[];

  private specialElements: SpecialElements = {};

  constructor(specialElements: SpecialElements, states: Winners) {
    this.specialElements = specialElements;
    this.states = states;
    this.location = specialElements['winners-table-body'];
    this.tableLines = [];
    this.createPool(states.currentPage, states.limitCars, states.sort, states.order);
  }

  createPool(page: number, limit: number, sort: Sort, order: Order) {
    fetch(requests.pageWinners(page, limit, sort, order))
      .then((response) => {
        const totalPages = response.headers.get('X-Total-Count');
        if (totalPages) this.updateTotalCars(parseInt(totalPages));
        return response.json();
      })
      .then((allWinners: AllWinners) => {
        this.tableLines = [];
        allWinners.forEach((winner, index) =>
          this.tableLines.push(new TableLine(winner, (page - 1) * limit + index + 1))
        );
        const tableLines = this.tableLines.map((car) => car.selling);
        this.location.replaceChildren(...tableLines);
      });
    // .catch((error: Error) => {
    //   console.log(error);
    //   new AlertMessage('Server is not responding', 5000);
    // });
  }

  updateTotalCars(totalCars: number) {
    this.states.totalCars = totalCars;
    const totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    this.specialElements['winners-page-number'].innerText = `Page #${this.states.currentPage} of ${totalPages}`;
  }
}

export default RacePool;
