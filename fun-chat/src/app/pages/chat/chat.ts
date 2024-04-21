import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as requests from '../../services/worker/requests';
import * as types from '../../services/worker/types';
import { MESSAGES_TYPES } from '../../services/worker/enums';
import * as markup from './markup';
import './chat.css';

class Chat extends Element {
  private states: StateManager;

  private companions: { login: string; isLogined: boolean; unreadMessages: number }[] = [];

  constructor(parent: HTMLElement, states: StateManager) {
    super(markup.about as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.states = states;
    this.createListeners();
    this.configureDateWhenCreate();
    Console.appendText('Create Chat page');
  }

  createListeners() {
    this.specialElements['chat-info'].addEventListener('click', () => this.states.router.goToPage(PAGE_NAMES.ABOUT));
    this.specialElements['chat-logout'].addEventListener('click', () => this.states.dispatcher.processLogOut());
  }

  configureDateWhenCreate() {
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
    this.states.worker.sendMessage(requests.requestCompanionLoggedIn().request);
  }

  receiveMessage(type: string, message: string): void {
    const eventData = JSON.parse(message);

    switch (eventData.type) {
      case MESSAGES_TYPES.ERROR:
        break;

      case MESSAGES_TYPES.USER_LOGIN:
        break;

      case MESSAGES_TYPES.USER_LOGOUT:
        break;

      case MESSAGES_TYPES.USER_ACTIVE:
        this.createCompanionsList(eventData.payload.users);
        this.states.worker.sendMessage(requests.requestCompanionLoggedOut().request);
        break;

      case MESSAGES_TYPES.USER_INACTIVE:
        this.createCompanionsList(eventData.payload.users);
        this.requestCompanionMessageHistory();
        break;

      default:
        Console.appendText(`Unresolving message: ${JSON.stringify(eventData)}`);
    }
  }

  createCompanionsList(users: types.UserLogged[]) {
    for (const user of users) {
      this.companions.push({
        login: user.login,
        isLogined: user.isLogined,
        unreadMessages: 0,
      });
      console.log(user);
    }
  }

  requestCompanionMessageHistory() {
    for (const user of this.companions) {
      this.states.worker.sendMessage(requests.requestCompanionMessageHistory(user.login).request);
    }
  }
}

export default Chat;
