import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './winners.css';
import TablePool from './tablePool';
import * as garageTypes from '../../services/stateManager/types';

class Winners {
  private states: garageTypes.Winners;

  private sellingHTML;

  private tablePool;

  private specialElements: SpecialElements = {};

  constructor(states: garageTypes.Winners) {
    this.states = states;
    this.sellingHTML = createElement(markup.winners as ElementsDefinitions, this.specialElements);
    this.states.specialElements = this.specialElements;

    document.body.appendChild(this.sellingHTML);

    this.tablePool = new TablePool(this.specialElements, this.states);
    this.creatingEventHandlers();
  }

  creatingEventHandlers() {
    this.specialElements['pagination-winners-prev'].addEventListener('click', () => this.pageChange(-1));
    this.specialElements['pagination-winners-next'].addEventListener('click', () => this.pageChange(1));
  }

  pageChange(bias: number) {
    const nextPage = this.states.currentPage + bias;
    if (nextPage < 1 || nextPage > Math.ceil(this.states.totalCars / this.states.limitCars)) return;
    this.states.currentPage = nextPage;
    this.tablePool.createPool(this.states.currentPage, this.states.limitCars, this.states.sort, this.states.order);
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.tablePool.createPool(this.states.currentPage, this.states.limitCars, this.states.sort, this.states.order);
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Winners;
