import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import './style.css';

class LoginPage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor() {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);

    this.unamed.loginButton.addEventListener('click', () => {
      const userFirstNameElement = this.unamed.loginFirstName as HTMLInputElement;
      const userSureNameElement = this.unamed.loginSureName as HTMLInputElement;
      if (userFirstNameElement.validity.valid && userSureNameElement.validity.valid) {
        this.unamed.loginPage.classList.add('page-hide');
        setTimeout(() => this.unamed.loginPage.classList.add('page-none'), 700);
      }
    });
  }

  none() {
    this.page.classList.add('page-none');
  }
}

export default LoginPage;
