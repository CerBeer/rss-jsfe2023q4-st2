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
    Console.appendText('Create Login page');
  }

  createListeners() {
    const buttonAbout = this.specialElements['chat-info'];
    buttonAbout.addEventListener('click', () => this.states.router.goToPage(PAGE_NAMES.ABOUT));
  }
}

export default Login;
