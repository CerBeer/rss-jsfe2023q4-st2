import { Console } from '../../utils/console/console';
import * as state from './states';
import { StorageData } from '../../utils/storage/storage';
import Router from '../router/router';
import { LoggedUser } from '../../services/stateManager/types';
import Worker from '../worker/worker';
import Dispatcher from '../dispatcher/dispatcher';
import ChatService from '../chatService/chatService';
import Splash from '../../pages/splash/splash';

class StateManager {
  private _states;

  constructor() {
    this._states = state.states;
    Console.appendText('Create StateManager');
  }

  get states() {
    return this._states;
  }

  get splashPage() {
    return this._states.splashPage!;
  }

  set splashPage(splashPage: Splash) {
    this._states.splashPage = splashPage;
  }

  get router() {
    return this._states.router!;
  }

  set router(router: Router) {
    this._states.router = router;
  }

  get worker() {
    return this._states.worker!;
  }

  set worker(worker: Worker) {
    this._states.worker = worker;
  }

  get dispatcher() {
    return this._states.dispatcher!;
  }

  set dispatcher(dispatcher: Dispatcher) {
    this._states.dispatcher = dispatcher;
  }

  get chatService() {
    return this._states.chatService!;
  }

  set chatService(chatService: ChatService) {
    this._states.chatService = chatService;
  }

  get loggedUser() {
    return this._states.session.getVal('loggedUser') as LoggedUser;
  }

  set loggedUser(loggedUser: LoggedUser) {
    this._states.session.setVal('loggedUser', loggedUser);
  }

  get isUserLogged() {
    return this._states.isUserLogged;
  }

  set isUserLogged(isUserLogged: boolean) {
    this._states.isUserLogged = isUserLogged;
  }

  getVal(key: string) {
    return this._states.session.getVal(key);
  }

  setVal(key: string, value: StorageData) {
    this._states.session.setVal(key, value);
  }
}

export default StateManager;
