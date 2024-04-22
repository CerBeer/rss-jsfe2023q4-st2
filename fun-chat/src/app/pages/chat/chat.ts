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

  private lastRequestIDSendMessage = '';

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
    this.specialElements['right-send-input'].addEventListener('input', () => this.setButtonSendDisabled());
    this.specialElements['right-send-input-form'].addEventListener('submit', (e) => this.submitMessage(e));
  }

  configureDateWhenCreate() {
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }

  setButtonSendDisabled() {
    const isCorrect = this.checkAvailableMessageSubmit();
    const button = this.specialElements['right-send-button'] as HTMLButtonElement;
    button.disabled = !isCorrect;
  }

  setMessageSendDisabled() {
    const isCorrect = this.lastRequestIDSendMessage === '';
    const input = this.specialElements['right-send-input'] as HTMLInputElement;
    input.disabled = !isCorrect;
  }

  submitMessage(event: Event) {
    event.preventDefault();
    Console.appendText(`Chat page: submit message to ${this._currentCompanion}`);
    if (!this.checkAvailableMessageSubmit()) return;
    const currentElement = this.specialElements['right-send-input'] as HTMLInputElement;
    const message = currentElement.value;
    this.lastRequestIDSendMessage = this.states.chatService.requestSendMessage(this._currentCompanion, message);
    currentElement.value = '';
    this.setMessageSendDisabled();
    this.setButtonSendDisabled();
    return false;
  }

  checkAvailableMessageSubmit() {
    const currentElement = this.specialElements['right-send-input'] as HTMLInputElement;
    const valueElement = currentElement.value;
    if (valueElement.length === 0) return false;
    return true;
  }

  selectCompanions(e: Event) {
    const target = e.target as HTMLElement;
    let login = target.dataset.user;
    if (!login) login = target.parentElement?.dataset.user;
    if (!login) return;
    this._currentCompanion = login;
    this.states.chatService.changeCurrentCompanion(login);
    this.setMessageSendDisabled();
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

      case MESSAGES_CHAT_SERVICE_TYPES.RESPONSE_MESSAGE_TO_COMPANION:
        this.proccessResponceMessageToCompanion(message);
        break;

      default:
        Console.appendText(`Chat page received unresolved message: ${type}/${JSON.stringify(message)}`);
    }
  }

  proccessResponceMessageToCompanion(message: string) {
    const msg = JSON.parse(message);
    if (msg.message.to !== this._currentCompanion) return;
    this.createMessage(msg.message);
    this.specialElements['right-dialog'].scrollTop = this.specialElements['right-dialog'].scrollHeight;
    if (this.lastRequestIDSendMessage === msg.id) {
      this.lastRequestIDSendMessage = '';
      this.setMessageSendDisabled();
      this.setButtonSendDisabled();
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
    messages.forEach((message) => {
      this.createMessage(message);
      if (message.status.isReaded || message.from === this.states.loggedUser.login)
        this.specialElements['right-dialog'].scrollTop = this.specialElements['right-dialog'].scrollHeight;
    });
  }

  createMessage(message: workerTypes.Message) {
    const markupElement = markup.messageElement as ElementsDefinitions;
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
  }

  statusMessageToString(message: workerTypes.Message) {
    if (message.from === this._currentCompanion) return message.status.isEdited ? 'изменено' : '';
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
