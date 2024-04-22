import { Console } from '../../utils/console/console';
import StateManager from '../stateManager/stateManager';
import * as requests from '../worker/requests';
import * as workerTypes from '../worker/types';
import { MESSAGES_TYPES } from '../worker/enums';
import { PAGE_NAMES } from '../router/enums';
import { MESSAGES_CHAT_SERVICE_TYPES } from './enums';
// import * as types from './types';

class ChatService {
  private states: StateManager;

  private _companions: {
    id: string;
    login: string;
    isLogined: boolean;
    unreadMessages: number;
    sellingHTML: HTMLElement | undefined;
  }[] = [];

  private _currentCompanion = '';

  constructor(states: StateManager) {
    Console.appendText('Create Chat service');
    this.states = states;
    this.states.chatService = this;
  }

  get companions() {
    return this._companions.filter((user) => user.login !== this.states.loggedUser.login);
  }

  getCompanionStatus(login: string) {
    const companion = this._companions.find((user) => user.login === login);
    if (companion === undefined) return false;
    return companion.isLogined;
  }

  async processMessage(type: workerTypes.MessagesType, message: string) {
    const eventData = JSON.parse(message);
    switch (type) {
      case MESSAGES_TYPES.ERROR:
        break;

      case MESSAGES_TYPES.USER_LOGIN:
        this.processUserLogin();
        Console.appendText(`chatService received message: ${type}/${message}`);
        break;

      case MESSAGES_TYPES.USER_LOGOUT:
        break;

      case MESSAGES_TYPES.USER_ACTIVE:
        this.createCompanionsList(eventData.payload.users);
        this.states.worker.sendMessage(requests.requestCompanionLoggedOut().request);
        Console.appendText(`chatService received message: ${type}/${message}`);
        break;

      case MESSAGES_TYPES.USER_INACTIVE:
        this.createCompanionsList(eventData.payload.users);
        this.requestCompanionMessageHistoryOnLogin();
        Console.appendText(`chatService received message: ${type}/${message}`);
        break;

      case MESSAGES_TYPES.MSG_FROM_USER:
        if (this._companions.find((user) => user.id === eventData.id) !== undefined) {
          const messages = eventData.payload.messages.filter((msg: workerTypes.Message) => {
            return msg.to === this.states.loggedUser.login && !msg.status.isReaded;
          });
          this.processCompanionMessageHistoryOnLogin(eventData.id, messages.length);
          return;
        }
        this.processCompanionMessageHistory(eventData.payload.messages);
        break;

      case MESSAGES_TYPES.USER_EXTERNAL_LOGIN:
      case MESSAGES_TYPES.USER_EXTERNAL_LOGOUT:
        this.processCompanionLogInOut(eventData.payload.user.login, eventData.payload.user.isLogined);
        Console.appendText(`chatService received message: ${type}/${message}`);
        break;

      case MESSAGES_TYPES.MSG_SEND:
        this.processReceivingMessageFrom(eventData.id, eventData.payload.message);
        break;

      default:
    }
  }

  processUserLogin() {
    this._companions = [];
    this.states.worker.sendMessage(requests.requestCompanionLoggedIn().request);
  }

  createCompanionsList(users: workerTypes.UserLogged[]) {
    for (const user of users) {
      this._companions.push({
        id: '',
        login: user.login,
        isLogined: user.isLogined,
        unreadMessages: 0,
        sellingHTML: undefined,
      });
      this.states.router.sendToPage(PAGE_NAMES.CHAT, MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST, '');
    }
  }

  requestCompanionMessageHistoryOnLogin() {
    const firstUserWithoutID = this._companions.find(
      (user) => user.id === '' && user.login !== this.states.loggedUser.login
    );
    if (firstUserWithoutID !== undefined) {
      const request = requests.requestCompanionMessageHistory(firstUserWithoutID.login);
      firstUserWithoutID.id = request.id;
      this.states.worker.sendMessage(request.request);
    }
  }

  processCompanionMessageHistoryOnLogin(id: string, messagesCount: number) {
    const userWithID = this._companions.find((user) => user.id === id);
    if (userWithID === undefined) return;
    userWithID.unreadMessages = messagesCount;
    if (messagesCount > 0)
      this.states.router.sendToPage(PAGE_NAMES.CHAT, MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST, '');
    this.requestCompanionMessageHistoryOnLogin();
  }

  processCompanionLogInOut(login: string, isLogined: boolean) {
    Console.appendText(`External user isLogined: ${login}/${isLogined}`);
    const companion = this._companions.find((user) => user.login === login);
    if (companion !== undefined) {
      Console.appendText(`External user isLogined: ${login}/${isLogined}`);
      companion.isLogined = isLogined;
      this._companions.sort((a, b) => {
        if (a.isLogined === b.isLogined) return 0;
        if (a.isLogined) return -1;
        return 1;
      });
      this.states.router.sendToPage(PAGE_NAMES.CHAT, MESSAGES_CHAT_SERVICE_TYPES.COMPANION_STATUS_UPDATE, login);
    }
  }

  processReceivingMessageFrom(id: Text, message: workerTypes.Message) {
    Console.appendText(`Receiving message: ${message.from}/${message.datetime}`);
    if (message.from !== this.states.loggedUser.login) {
      const companion = this._companions.find((user) => user.login === message.from);
      if (companion !== undefined) {
        companion.unreadMessages += 1;
        this.states.router.sendToPage(
          PAGE_NAMES.CHAT,
          MESSAGES_CHAT_SERVICE_TYPES.RECEIVING_MESSAGE_FROM_COMPANION,
          ''
        );
      }
      return;
    }
    this.states.router.sendToPage(
      PAGE_NAMES.CHAT,
      MESSAGES_CHAT_SERVICE_TYPES.RESPONSE_MESSAGE_TO_COMPANION,
      JSON.stringify({ id: id, message: message })
    );
  }

  changeCurrentCompanion(login: string) {
    Console.appendText(`Change current companions: ${login}`);
    const companion = this._companions.find((user) => user.login === login);
    if (companion !== undefined) {
      this._currentCompanion = login;
      const request = requests.requestCompanionMessageHistory(login);
      this.states.worker.sendMessage(request.request);
    }
  }

  processCompanionMessageHistory(messages: workerTypes.Message[]) {
    this.states.router.sendToPage(
      PAGE_NAMES.CHAT,
      MESSAGES_CHAT_SERVICE_TYPES.MESSAGE_HISTORY_WITH_USER,
      JSON.stringify(messages)
    );
  }

  requestSendMessage(to: string, text: string) {
    const request = requests.requestSendUserMessage(to, text);
    this.states.worker.sendMessage(request.request);
    return request.id;
  }
}

export default ChatService;
