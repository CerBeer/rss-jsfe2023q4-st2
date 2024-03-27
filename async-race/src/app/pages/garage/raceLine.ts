import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import { templates } from './template';
import { Car } from '../../services/api/types';

export class RaceLine {
  private _car: Car;

  private sellingHTML;

  private SpecialElements: SpecialElements = {};

  constructor(car: Car) {
    this._car = car;
    this.sellingHTML = createElement(templates.templateRaceLine as ElementsDefinitions, this.SpecialElements);
    this.sellingHTML.dataset.carId = `${car.id}`;
    this.setCarName(car.name);
    this.setCarColor(car.color);
  }

  get selling() {
    return this.sellingHTML;
  }

  get car() {
    return this._car;
  }

  setCarColor(color: string) {
    this.SpecialElements['race-track-car'].style.backgroundColor = color;
  }

  setCarName(name: string) {
    this.car.name = name;
    this.SpecialElements['car-name'].innerText = name;
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default RaceLine;
