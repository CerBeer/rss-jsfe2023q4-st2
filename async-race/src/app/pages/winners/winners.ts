import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './winners.css';
import * as garageTypes from '../../services/stateManager/types';

class Winners {
  private states: garageTypes.Winners;

  private sellingHTML;

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor(states: garageTypes.Winners) {
    this.states = states;
    this.sellingHTML = createElement(markup.winners as ElementsDefinitions, this.SpecialElements);

    document.body.appendChild(this.sellingHTML);
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

export default Winners;
