import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './garage.css';
import RacePool from './racePool';
import { Garage as GarageType } from '../../services/stateManager/types';

class Garage {
  private states: GarageType;

  private sellingHTML;

  private racePool;

  private specialElements: SpecialElements = {};

  constructor(states: GarageType) {
    this.states = states;
    this.sellingHTML = createElement(markup.garage as ElementsDefinitions, this.specialElements);
    this.states.specialElements = this.specialElements;

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
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Garage;
