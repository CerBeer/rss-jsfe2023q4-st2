import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import './style.css';

class StartPage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor() {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);
  }

  hide() {
    this.page.classList.add('page-none');
  }

  show() {
    this.page.classList.remove('page-none');
  }
}

export default StartPage;
