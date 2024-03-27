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
    this.creatingEventHandlers();
  }

  creatingEventHandlers() {
    this.specialElements['winners-header-wins'].addEventListener('click', (e) => this.orderChange(e, 'wins'));
    this.specialElements['winners-header-time'].addEventListener('click', (e) => this.orderChange(e, 'time'));
  }

  orderChange(e: Event, sort: Sort) {
    if (sort === this.states.sort) {
      if (this.states.order === 'ASC') this.states.order = 'DESC';
      else this.states.order = 'ASC';
    } else {
      this.states.sort = sort;
      this.states.order = 'ASC';
    }
    this.specialElements['winners-header-wins'].classList.remove('winners-table-header-cell-asc');
    this.specialElements['winners-header-wins'].classList.remove('winners-table-header-cell-desc');
    this.specialElements['winners-header-time'].classList.remove('winners-table-header-cell-asc');
    this.specialElements['winners-header-time'].classList.remove('winners-table-header-cell-desc');
    const classOrder = 'winners-table-header-cell-' + this.states.order.toLowerCase();
    const el = e.target as HTMLElement;
    el.classList.add(classOrder);
    this.createPool(this.states.currentPage, this.states.limitCars, this.states.sort, this.states.order);
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
  }

  updateTotalCars(totalCars: number) {
    this.states.totalCars = totalCars;
    const totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    this.specialElements['winners-page-number'].innerText = `Page #${this.states.currentPage} of ${totalPages}`;
  }
}

export default RacePool;
