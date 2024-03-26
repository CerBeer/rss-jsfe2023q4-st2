import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './winners.css';
import * as garageTypes from '../../services/stateManager/types';

class Winners {
  private states: garageTypes.Winners;

  private sellingHTML;

  private specialElements: SpecialElements = {};

  constructor(states: garageTypes.Winners) {
    this.states = states;
    this.sellingHTML = createElement(markup.winners as ElementsDefinitions, this.specialElements);
    this.states.specialElements = this.specialElements;

    document.body.appendChild(this.sellingHTML);
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Winners;
