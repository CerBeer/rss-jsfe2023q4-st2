import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import { MESSAGES_CHAT_SERVICE_TYPES } from '../../services/chatService/enums';
import * as markup from './markup';
import './chat.css';

class Chat extends Element {
  private states: StateManager;

  private companions: Element[] = [];

  constructor(parent: HTMLElement, states: StateManager) {
    super(markup.chat as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.states = states;
    this.createListeners();
    this.configureDateWhenCreate();
    this.updateCompanionsList();
    Console.appendText('Create Chat page');
  }

  createListeners() {
    this.specialElements['chat-info'].addEventListener('click', () => this.states.router.goToPage(PAGE_NAMES.ABOUT));
    this.specialElements['chat-logout'].addEventListener('click', () => this.states.dispatcher.sendLogOut());
  }

  configureDateWhenCreate() {
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }

  receiveMessage(type: string, message: string): void {
    Console.appendText(`Chat page received: ${type}/${message}`);
    switch (type) {
      case MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST:
        this.updateCompanionsList();
        break;

      default:
        Console.appendText(`Chat page received unresolved message: ${type}/${JSON.stringify(message)}`);
    }
  }

  updateCompanionsList() {
    const companionList = this.states.chatService.companions;
    const companions = this.companions;
    const markupElement = markup.companionListElement as ElementsDefinitions;
    companionList.forEach((user, index) => {
      if (index >= companions.length) {
        const newElement = new Element(markupElement);
        companions.push(newElement);
        this.specialElements['left-users-list'].appendChild(newElement.sellingHTML);
      }
      const companion = companions[index];
      companion.specialElements['user-status'].classList.toggle('user-status-active', user.isLogined);
      companion.specialElements['user-login'].innerText = user.login;
      companion.specialElements['user-messages'].innerText = user.unreadMessages.toString();
      companion.specialElements['user-messages'].classList.toggle('hide-element', user.unreadMessages === 0);
    });
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }
}

export default Chat;
