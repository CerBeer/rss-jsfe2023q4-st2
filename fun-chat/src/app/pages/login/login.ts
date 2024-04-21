import { Console } from '../../utils/console/console';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { LoggedUser } from '../../services/stateManager/types';
import * as markup from './markup';
import './login.css';

class Login extends Element {
  private states: StateManager;

  private loggedUser: LoggedUser;

  constructor(parent: HTMLElement, states: StateManager) {
    super(markup.login as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.states = states;
    this.loggedUser = this.states.loggedUser;
    this.createListeners();
    const button = this.specialElements['button-login'] as HTMLButtonElement;
    button.disabled = true;
    Console.appendText('Create Login page');
  }

  createListeners() {
    this.specialElements['chat-info'].addEventListener('click', () => this.states.router.goToPage(PAGE_NAMES.ABOUT));
    this.specialElements['login-name'].addEventListener('input', () => {
      this.checkName();
      this.setButtonDisabled();
    });
    this.specialElements['login-password'].addEventListener('input', () => {
      this.checkPassword();
      this.setButtonDisabled();
    });
    this.specialElements['login-form'].addEventListener('submit', (e) => this.submitLogin(e));
  }

  checkName() {
    const parentElement = this.specialElements['field-login-name'] as HTMLInputElement;
    const currentElement = this.specialElements['login-name'] as HTMLInputElement;
    const valueElement = currentElement.value;
    let isCorrect = true;
    if (valueElement.length < 4) isCorrect = false;
    parentElement.classList.toggle('input-error', !isCorrect);
    return isCorrect;
  }

  checkPassword() {
    const parentElement = this.specialElements['field-login-password'] as HTMLInputElement;
    const currentElement = this.specialElements['login-password'] as HTMLInputElement;
    const valueElement = currentElement.value;
    let isCorrectLength = true;
    let isCorrectContains = true;
    if (valueElement.length < 4) isCorrectLength = false;
    parentElement.classList.toggle('input-error', !isCorrectLength);
    if (valueElement.toLowerCase() === valueElement) isCorrectContains = false;
    parentElement.classList.toggle('input-error-contains', !isCorrectContains);
    return isCorrectLength && isCorrectContains;
  }

  setButtonDisabled() {
    const button = this.specialElements['button-login'] as HTMLButtonElement;
    button.disabled = !(this.checkName() && this.checkPassword());
  }

  submitLogin(event: Event) {
    event.preventDefault();
    Console.appendText('OnSubmit');
    if (!(this.checkName() && this.checkPassword())) return;
    const elementName = this.specialElements['login-name'] as HTMLInputElement;
    const elementPassword = this.specialElements['login-password'] as HTMLInputElement;
    this.states.loggedUser = { login: elementName.value, password: elementPassword.value };
    this.states.dispatcher.processOpen();
    return false;
  }

  receiveMessage(type: string, message: string): void {
    Console.appendText(`Caught message in Login page: ${type}, ${message}`);
    const messageErrorMarkup = {
      tag: 'div',
      text: ``,
      attributes: {},
      classes: 'splash-error-background',
      child: [
        {
          tag: 'div',
          text: `${message[0].toUpperCase()}${message.slice(1)}`,
          attributes: { identifier: 'console-text' },
          classes: 'splash-error',
          child: [],
        },
      ],
    };
    const messageError = Element.createElement(messageErrorMarkup as ElementsDefinitions);
    this.specialElements['login-form'].appendChild(messageError);
    setTimeout(() => messageError.remove(), 1500);
  }
}

export default Login;
