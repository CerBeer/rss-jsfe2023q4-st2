import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import './style.css';

class StartPage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor() {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    document.body.appendChild(this.page);
  }

  hide() {
    this.page.classList.add('element-hide');
  }

  show() {
    this.page.classList.remove('element-hide');
  }
}

export default StartPage;
