import { router } from '../../../index';
import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import { templates } from './template';
import './style.css';

class PuzzlePage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor() {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    for (let i = 1; i <= 24; i += 1) {
      const newElement = templates.templateOptionPage as Definition;
      newElement.text = `${i}`;
      newElement.attributes = { value: `${i}` };
      this.unamed.currentPage.appendChild(createElement(newElement));
    }

    for (let i = 1; i <= 10; i += 1) {
      const newElement = templates.templatePlaceNumber as Definition;
      newElement.text = `${i}`;
      this.unamed.poolPlaceNumber.appendChild(createElement(newElement));
    }

    for (let i = 1; i <= 10; i += 1) {
      const newElement = templates.templatePlaceLine as Definition;
      this.unamed.poolPlaceLine.appendChild(createElement(newElement));
    }

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);

    this.unamed.buttonLogOut.addEventListener('click', () => {
      router.logout();
    });
  }

  hide() {
    this.page.classList.add('page-none');
  }

  show() {
    this.page.classList.remove('page-none');
  }
}

export default PuzzlePage;
