import { ElementsDefinitions, createElement } from '../../utils/elements';
import { templates } from './template';
import * as requests from '../../services/api/requests';
import { Car, Cars, Winner } from '../../services/api/types';

export class TableLine {
  private car: Car;

  private winner: Winner;

  private sellingHTML;

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor(winner: Winner, index: number) {
    this.winner = winner;
    this.sellingHTML = createElement(templates.templateTableLine as ElementsDefinitions, this.SpecialElements);
    this.sellingHTML.dataset.carId = `${winner.id}`;
    this.SpecialElements['winners-cell-id'].innerText = `${index}`;
    this.SpecialElements['winners-cell-wins'].innerText = `${winner.wins}`;
    this.SpecialElements['winners-cell-time'].innerText = `${winner.time}`;
    this.car = { id: 0, name: '', color: '' };
    this.getCar(winner.id);
  }

  getCar(carId: number) {
    fetch(requests.getCar(carId))
      .then((response) => response.json())
      .then((cars: Cars) => {
        this.car = cars[0];
        this.setCarName(cars[0].name);
        this.setCarColor(cars[0].color);
      });
  }

  get selling() {
    return this.sellingHTML;
  }

  setCarColor(color: string) {
    this.SpecialElements['winners-cell-car-car'].style.backgroundColor = color;
  }

  setCarName(name: string) {
    this.car.name = name;
    this.SpecialElements['winners-cell-name'].innerText = name;
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default TableLine;
