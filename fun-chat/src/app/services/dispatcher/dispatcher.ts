import { Console } from '../../utils/console/console';
import StateManager from '../stateManager/stateManager';
import * as requests from '../worker/requests';
import * as types from '../worker/types';
import { MESSAGES_TYPES } from '../worker/enums';
import { PAGE_NAMES } from '../router/enums';

class Dispatcher {
  private states: StateManager;

  private lastQueryLoginID = '';

  constructor(states: StateManager) {
    Console.appendText('Create Dispatcher');
    this.states = states;
    this.states.dispatcher = this;
  }

  processOpen() {
    Console.appendText('WS open: open');
    if (this.states.states.session.isEmptyVal('loggedUser')) {
      this.lastQueryLoginID = '';
      this.states.isUserLogged = false;
      this.states.router.goToPage(PAGE_NAMES.LOGIN);
    } else {
      this.processLogIn();
    }
  }

  processLogIn() {
    if (!(this.states.states.session.isEmptyVal('loggedUser') || this.states.isUserLogged)) {
      Console.appendText('Send: login');
      const loginRequest = requests.requestUserLogin(this.states.loggedUser);
      this.states.worker.sendMessage(loginRequest.request);
      this.lastQueryLoginID = loginRequest.id;
    }
  }

  processLogOut() {
    if (!this.states.states.session.isEmptyVal('loggedUser') && this.states.isUserLogged) {
      Console.appendText('Send: logout');
      const loginRequest = requests.requestUserLogout(this.states.loggedUser);
      this.states.worker.sendMessage(loginRequest.request);
    }
  }

  processMessage(event: MessageEvent) {
    const eventData = JSON.parse(event.data);
    switch (eventData.type) {
      case MESSAGES_TYPES.ERROR:
        this.processMessageError(eventData);
        break;

      case MESSAGES_TYPES.USER_LOGIN:
        this.processMessageUserLogin(eventData);
        break;

      case MESSAGES_TYPES.USER_LOGOUT:
        this.processMessageUserLogOut(eventData);
        break;

      default:
        this.states.router.sendToPage(PAGE_NAMES.CHAT, eventData.type, event.data);
    }
  }

  processMessageError(eventData: types.ResponseError) {
    Console.appendText(`Received error: ${eventData.payload.error}`);
    if (this.lastQueryLoginID === eventData.id) {
      this.setStateUserLogOut();
      this.states.router.sendToPage(PAGE_NAMES.LOGIN, 'ERROR', eventData.payload.error);
    }
  }

  processMessageUserLogin(eventData: types.ResponseUserLogIn) {
    Console.appendText(
      `Received UserLogin: LogIn:${eventData.payload.user.login} isLogined:${eventData.payload.user.isLogined}`
    );
    if (eventData.payload.user.isLogined) this.setStateUserLogIn(this.states.loggedUser);
  }

  processMessageUserLogOut(eventData: types.ResponseUserLogOut) {
    Console.appendText(
      `Received UserLogin: LogOut:${eventData.payload.user.login} isLogined:${eventData.payload.user.isLogined}`
    );
    this.setStateUserLogOut();
  }

  setStateUserLogIn(user: types.User) {
    this.lastQueryLoginID = '';
    this.states.loggedUser = user;
    this.states.isUserLogged = true;
    this.states.router.goToPageByStatus();
  }

  setStateUserLogOut() {
    this.lastQueryLoginID = '';
    this.states.loggedUser = { login: '', password: '' };
    this.states.isUserLogged = false;
    this.states.router.goToPageByStatus();
  }
}

export default Dispatcher;
