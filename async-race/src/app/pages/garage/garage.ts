import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './garage.css';
import RacePool from './racePool';
import * as garageTypes from '../../services/stateManager/types';

class Garage {
  private states: garageTypes.Garage;

  private sellingHTML;

  private racePool;

  private specialElements: { [key: string]: HTMLElement } = {};

  constructor(states: garageTypes.Garage) {
    this.states = states;
    this.sellingHTML = createElement(markup.garage as ElementsDefinitions, this.specialElements);

    document.body.appendChild(this.sellingHTML);

    this.racePool = new RacePool(this.specialElements, this.states);

    this.creatingEventHandlers();
  }

  creatingEventHandlers() {
    this.specialElements['pagination-garage-prev'].addEventListener('click', () => this.pageChange(-1));
    this.specialElements['pagination-garage-next'].addEventListener('click', () => this.pageChange(1));
  }

  pageChange(bias: number) {
    const nextPage = this.states.currentPage + bias;
    if (nextPage < 1 || nextPage > Math.ceil(this.states.totalCars / this.states.limitCars)) return;
    this.states.currentPage = nextPage;
    this.racePool.createPool(this.states.currentPage, this.states.limitCars);
  }

  hide() {
    this.sellingHTML.classList.add('element-hide');
  }

  show() {
    this.sellingHTML.classList.remove('element-hide');
  }

  none() {
    this.sellingHTML.classList.add('element-none');
  }

  neno() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Garage;
