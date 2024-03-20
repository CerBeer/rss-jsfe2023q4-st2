import { router } from '../../../index';
import { Storage } from '../../components/storage/storage';
import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import './style.css';

class LoginPage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor(states: Storage) {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);

    this.unamed.loginButton.addEventListener('click', () => {
      const userFirstNameElement = this.unamed.loginFirstName as HTMLInputElement;
      const userFirstName = userFirstNameElement.value;
      userFirstNameElement.value = this.capitalize(userFirstName);
      const userSurnameElement = this.unamed.loginSurname as HTMLInputElement;
      const userSurname = userSurnameElement.value;
      userSurnameElement.value = this.capitalize(userSurname);
      if (userFirstNameElement.validity.valid && userSurnameElement.validity.valid) {
        const user = { firstName: userFirstNameElement.value, surname: userSurnameElement.value };
        states.setVal('user', user);
        states.save('user');
        this.hide();
        router.login();
      }
    });
    if (!states.isEmptyVal('user')) this.hide();
  }

  capitalize(str: string) {
    return str
      .split('-')
      .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
      .join('-');
  }

  hide() {
    this.unamed.loginPage.classList.add('page-hide');
    setTimeout(() => this.unamed.loginPage.classList.add('page-none'), 700);
  }

  show() {
    const userFirstNameElement = this.unamed.loginFirstName as HTMLInputElement;
    userFirstNameElement.value = '';
    const userSurnameElement = this.unamed.loginSurname as HTMLInputElement;
    userSurnameElement.value = '';
    this.unamed.loginPage.classList.remove('page-none');
    this.unamed.loginPage.classList.remove('page-hide');
  }
}

export default LoginPage;
