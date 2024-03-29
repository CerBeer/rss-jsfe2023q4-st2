import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './footer.css';

class Footer {
  private sellingHTML;

  private specialElements: { [key: string]: HTMLElement } = {};

  constructor() {
    this.sellingHTML = createElement(markup.footer as ElementsDefinitions, this.specialElements);

    document.body.appendChild(this.sellingHTML);
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Footer;
