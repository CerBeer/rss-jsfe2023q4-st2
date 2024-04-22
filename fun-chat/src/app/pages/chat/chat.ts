import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import { MESSAGES_CHAT_SERVICE_TYPES } from '../../services/chatService/enums';
import * as workerTypes from '../../services/worker/types';
import * as markup from './markup';
import './chat.css';

class Chat extends Element {
  private states: StateManager;

  private companions: Element[] = [];

  private _currentCompanion = '';

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
    this.specialElements['left-users-list'].addEventListener('click', (e) => this.selectCompanions(e));
  }

  configureDateWhenCreate() {
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }

  selectCompanions(e: Event) {
    const target = e.target as HTMLElement;
    let login = target.dataset.user;
    if (!login) login = target.parentElement?.dataset.user;
    if (!login) return;
    this._currentCompanion = login;
    this.states.chatService.changeCurrentCompanion(login);
  }

  receiveMessage(type: string, message: string): void {
    Console.appendText(`Chat page received: ${type}/${message}`);
    switch (type) {
      case MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST:
        this.updateCompanionsList();
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.RECEIVING_MESSAGE_FROM_COMPANION:
        this.updateCompanionsList();
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_HISTORY_WITH_USER:
        this.createMessagesList(JSON.parse(message));
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.COMPANION_STATUS_UPDATE:
        this.updateCompanionsList();
        if (message === this._currentCompanion) this.setCurrentCompanionStatus();
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
      companion.sellingHTML.dataset.user = user.login;
      companion.specialElements['user-status'].classList.toggle('user-status-active', user.isLogined);
      companion.specialElements['user-login'].innerText = user.login;
      companion.specialElements['user-messages'].innerText = user.unreadMessages.toString();
      companion.specialElements['user-messages'].classList.toggle('hide-element', user.unreadMessages === 0);
    });
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }

  createMessagesList(messages: workerTypes.Message[]) {
    this.specialElements['right-companion-login'].innerText = this._currentCompanion;
    this.setCurrentCompanionStatus();
    this.specialElements['right-dialog'].innerHTML = '';
    if (messages.length === 0) {
      const placeholderMarkup = {
        tag: 'label',
        text: 'Напишите ваше первое сообщение...',
        attributes: { identifier: 'right-dialog-placeholder' },
        classes: 'chat-main-right-dialog-placeholder',
        child: [],
      };
      this.specialElements['right-dialog'].appendChild(Element.createElement(placeholderMarkup as ElementsDefinitions));
      return;
    }
    const markupElement = markup.messageElement as ElementsDefinitions;
    messages.forEach((message) => {
      const newElement = new Element(markupElement);
      this.specialElements['right-dialog'].appendChild(newElement.sellingHTML);
      newElement.specialElements['header-label-left'].innerText = message.from;
      newElement.specialElements['header-label-right'].innerText = new Date(message.datetime).toLocaleString();
      newElement.specialElements['box-text'].innerText = message.text;
      newElement.specialElements['footer-label-left'].innerText = '';
      newElement.specialElements['footer-label-right'].innerText = this.statusMessageToString(message);
      newElement.specialElements['dialog-message'].classList.toggle(
        'message-from-companion',
        message.to === this.states.loggedUser.login
      );
      Console.appendText(
        `${message.to} === ${this.states.loggedUser.login}:${message.to === this.states.loggedUser.login}`
      );
    });
  }

  statusMessageToString(message: workerTypes.Message) {
    if (message.status.isReaded) return 'прочитано';
    if (message.status.isEdited) return 'изменено';
    return 'доставлено';
  }

  setCurrentCompanionStatus() {
    const status = this.states.chatService.getCompanionStatus(this._currentCompanion);
    this.specialElements['right-companion-status'].innerText = status ? 'в сети' : 'не в сети';
    this.specialElements['right-companion-status'].classList.toggle('status-offline', !status);
  }
}

export default Chat;
