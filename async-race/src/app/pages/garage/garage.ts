import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './garage.css';
import { RacePool } from './racePool';
import { Garage as GarageType, Winners } from '../../services/stateManager/types';

class Garage {
  private states: GarageType;

  private statesWinners: Winners;

  private sellingHTML;

  private racePool;

  private specialElements: SpecialElements = {};

  constructor(states: GarageType, statesWinners: Winners) {
    this.states = states;
    this.statesWinners = statesWinners;
    this.sellingHTML = createElement(markup.garage as ElementsDefinitions, this.specialElements);
    this.states.specialElements = this.specialElements;

    document.body.appendChild(this.sellingHTML);

    this.racePool = new RacePool(this.specialElements, this.states, this.statesWinners);
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Garage;
