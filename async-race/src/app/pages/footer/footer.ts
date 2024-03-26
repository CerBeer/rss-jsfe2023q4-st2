import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './footer.css';

class Footer {
  private sellingHTML;

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor() {
    this.sellingHTML = createElement(markup.footer as ElementsDefinitions, this.SpecialElements);

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

export default Footer;
