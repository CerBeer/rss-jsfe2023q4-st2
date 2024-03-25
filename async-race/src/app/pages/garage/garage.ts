import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './garage.css';

class Garage {
  private page;

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor() {
    this.page = createElement(markup.garage as ElementsDefinitions, this.SpecialElements);

    document.body.appendChild(this.page);
  }

  hide() {
    this.page.classList.add('element-hide');
  }

  show() {
    this.page.classList.remove('element-hide');
  }

  none() {
    this.page.classList.add('element-none');
  }

  neno() {
    this.page.classList.remove('element-none');
  }
}

export default Garage;
