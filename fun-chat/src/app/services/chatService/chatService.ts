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

  constructor(states: StateManager) {
    Console.appendText('Create Chat service');
    this.states = states;
    this.states.chatService = this;
  }

  get companions() {
    return this._companions.filter((user) => user.login !== this.states.loggedUser.login);
  }

  async processMessage(type: workerTypes.MessagesType, message: string) {
    const eventData = JSON.parse(message);
    Console.appendText(`chatService received message: ${type}/${message}`);
    switch (type) {
      case MESSAGES_TYPES.ERROR:
        break;

      case MESSAGES_TYPES.USER_LOGIN:
        this.processUserLogin();
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

      case MESSAGES_TYPES.MSG_FROM_USER:
        this.processCompanionMessageHistory(eventData.id, eventData.payload.messages.length);
        break;

      case MESSAGES_TYPES.USER_EXTERNAL_LOGIN:
      case MESSAGES_TYPES.USER_EXTERNAL_LOGOUT:
        this.processCompanionLogInOut(eventData.payload.user.login, eventData.payload.user.isLogined);
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

  requestCompanionMessageHistory() {
    const firstUserWithoutID = this._companions.find(
      (user) => user.id === '' && user.login !== this.states.loggedUser.login
    );
    if (firstUserWithoutID !== undefined) {
      const request = requests.requestCompanionMessageHistory(firstUserWithoutID.login);
      firstUserWithoutID.id = request.id;
      this.states.worker.sendMessage(request.request);
    }
  }

  processCompanionMessageHistory(id: string, messagesCount: number) {
    const userWithID = this._companions.find((user) => user.id === id);
    if (userWithID !== undefined) {
      Console.appendText(`User count messages: ${userWithID.login}/${messagesCount}`);
      userWithID.unreadMessages = messagesCount;
    }
    this.requestCompanionMessageHistory();
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
      this.states.router.sendToPage(PAGE_NAMES.CHAT, MESSAGES_CHAT_SERVICE_TYPES.UPDATE_COMPANIONS_LIST, '');
    }
  }
}

export default ChatService;
