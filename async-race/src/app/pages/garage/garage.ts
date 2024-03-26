import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './garage.css';
import RacePool from './racePool';
import * as garageTypes from '../../services/stateManager/types';

class Garage {
  private states: garageTypes.Garage;

  private sellingHTML;

  private racePool;

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor(states: garageTypes.Garage) {
    this.states = states;
    this.sellingHTML = createElement(markup.garage as ElementsDefinitions, this.SpecialElements);

    document.body.appendChild(this.sellingHTML);

    this.racePool = new RacePool(this.SpecialElements['race-pool'], this.states);
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
