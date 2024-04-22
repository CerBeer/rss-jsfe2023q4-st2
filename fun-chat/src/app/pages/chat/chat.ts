import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import { MESSAGES_CHAT_SERVICE_TYPES } from '../../services/chatService/enums';
import Message from './message';
import * as workerTypes from '../../services/worker/types';
import * as markup from './markup';
import './chat.css';

class Chat extends Element {
  private states: StateManager;

  private companions: Element[] = [];

  private _currentCompanion = '';

  private _currentCompanionMessages: Message[] = [];

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
    this.specialElements['right-dialog'].addEventListener('click', () => {
      this.setMessageStatusRead();
      const parent = this.specialElements['right-dialog'];
      parent.scrollTop = parent.scrollHeight;
    });
    this.specialElements['right-dialog'].addEventListener('scroll', () => this.setMessageStatusRead());
    this.specialElements['left-search'].addEventListener('input', () => this.setFilter());
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
    const isCorrect = this.lastRequestIDSendMessage === '' && this._currentCompanion !== '';
    const input = this.specialElements['right-send-input'] as HTMLInputElement;
    if (!isCorrect) input.value = '';
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
    // Console.appendText(`Chat page received: ${type}/${message}`);
    switch (type) {
      case MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST:
        this.updateCompanionsList();
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.RECEIVING_MESSAGE_FROM_COMPANION:
        this.processReceivingMessageFromCompanion(message);
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
        this.processResponseMessageToCompanion(message);
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_DELIVERY_STATUS_CHANGE:
        this.processMessageStatusDeliveredChange(message);
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_READ_STATUS_CHANGE:
        this.processMessageStatusReadedChange(message);
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_EDITED:
        this.processMessageStatusEditedChange(message);
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_DELETED:
        this.processDeleteMessage(message);
        break;

      case MESSAGES_CHAT_SERVICE_TYPES.CLEAR_CURRENT_COMPANION:
        this.clearCurrentCompanion();
        break;

      default:
        Console.appendText(`Chat page received unresolved message: ${type}/${JSON.stringify(message)}`);
    }
  }

  messageWithID(id: string) {
    return this._currentCompanionMessages.find((msg) => msg.messageID === id);
  }

  processMessageStatusDeliveredChange(message: string) {
    const eventData = JSON.parse(message);
    const messageWithID = this.messageWithID(eventData.payload.message.id);
    if (messageWithID === undefined) return;
    messageWithID.setMessgeStatusDelivered();
  }

  processMessageStatusReadedChange(message: string) {
    const eventData = JSON.parse(message);
    const messageWithID = this.messageWithID(eventData.payload.message.id);
    if (messageWithID === undefined) return;
    messageWithID.setMessgeStatusReaded();
  }

  processMessageStatusEditedChange(message: string) {
    const eventData = JSON.parse(message);
    const messageWithID = this.messageWithID(eventData.payload.message.id);
    if (messageWithID === undefined) return;
    messageWithID.setMessgeStatusEdited(eventData.payload.message.text);
  }

  processReceivingMessageFromCompanion(message: string) {
    Console.appendText(message);
    const msg = JSON.parse(message);
    if (msg.from !== this._currentCompanion) return;
    const parent = this.specialElements['right-dialog'];
    if (this._currentCompanionMessages.length === 0) parent.innerHTML = '';
    const newMessage = new Message(parent, msg, msg.to === this.states.loggedUser.login);
    this._currentCompanionMessages.push(newMessage);
  }

  processResponseMessageToCompanion(message: string) {
    const msgFull = JSON.parse(message);
    const msg = msgFull.message;
    if (msg.to !== this._currentCompanion) return;
    const parent = this.specialElements['right-dialog'];
    if (this._currentCompanionMessages.length === 0) parent.innerHTML = '';
    const newMessage = new Message(parent, msg, msg.to === this.states.loggedUser.login);
    this._currentCompanionMessages.push(newMessage);
    this.specialElements['right-dialog'].scrollTop = this.specialElements['right-dialog'].scrollHeight;
    if (this.lastRequestIDSendMessage === msgFull.id) {
      this.lastRequestIDSendMessage = '';
      this.setMessageSendDisabled();
      this.setButtonSendDisabled();
    }
    this.setMessageStatusRead();
    parent.scrollTop = parent.scrollHeight;
  }

  setFilter() {
    const searchfield = this.specialElements['left-search'] as HTMLInputElement;
    this.states.chatService.filter = searchfield.value;
    this.updateCompanionsList();
  }

  async updateCompanionsList() {
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
    const indexToDelete = companionList.length;
    while (indexToDelete < companions.length) {
      companions[indexToDelete].specialElements['companion-element'].remove();
      companions.splice(indexToDelete, 1);
    }
    this.specialElements['user-info'].innerText = `${this.states.loggedUser.login}`;
  }

  clearCurrentCompanion() {
    Console.appendText(`Clear current companions`);
    this._currentCompanion = '';
    this._currentCompanionMessages = [];
    this.specialElements['right-dialog'].innerHTML = '';
    const placeholderMarkup = {
      tag: 'label',
      text: 'Выберите пользователя для отправки сообщения...',
      attributes: { identifier: 'right-dialog-placeholder' },
      classes: 'chat-main-right-dialog-placeholder',
      child: [],
    };
    this.specialElements['right-dialog'].appendChild(Element.createElement(placeholderMarkup as ElementsDefinitions));
    this.specialElements['right-companion-login'].innerText = '';
    this.specialElements['right-companion-status'].innerText = '';
    this.setButtonSendDisabled();
    this.setMessageSendDisabled();
  }

  createMessagesList(messages: workerTypes.Message[]) {
    this.specialElements['right-companion-login'].innerText = this._currentCompanion;
    this.setCurrentCompanionStatus();
    this.specialElements['right-dialog'].innerHTML = '';
    this._currentCompanionMessages = [];
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
    const parent = this.specialElements['right-dialog'];
    messages.forEach((message) => {
      const newMessage = new Message(parent, message, message.to === this.states.loggedUser.login);
      this._currentCompanionMessages.push(newMessage);
      if (message.status.isReaded || message.from === this.states.loggedUser.login)
        parent.scrollTop = parent.scrollHeight;
    });
  }

  setMessageStatusRead() {
    this._currentCompanionMessages.forEach((message) => {
      if (message.message.to === this.states.loggedUser.login && !message.message.status.isReaded) {
        message.message.status.isReaded = true;
        message.setMessgeStatusReaded();
        this.states.chatService.requestReadMessage(message.messageID);
      }
    });
    this.states.chatService.updateCompanionUnreadMessage(this._currentCompanion, 0);
  }

  setCurrentCompanionStatus() {
    const status = this.states.chatService.getCompanionStatus(this._currentCompanion);
    this.specialElements['right-companion-status'].innerText = status ? 'в сети' : 'не в сети';
    this.specialElements['right-companion-status'].classList.toggle('status-offline', !status);
  }

  async processDeleteMessage(id: string) {
    const messageWithID = this.messageWithID(id);
    if (messageWithID === undefined) return;
    messageWithID.specialElements['dialog-message'].remove();
    this._currentCompanionMessages.splice(this._currentCompanionMessages.indexOf(messageWithID), 1);
  }
}

export default Chat;
