import { Console } from '../../utils/console/console';
import StateManager from '../stateManager/stateManager';
import Worker from '../worker/worker';
import Dispatcher from '../dispatcher/dispatcher';
import Login from '../../pages/login/login';
import About from '../../pages/about/about';
import Chat from '../../pages/chat/chat';
import { PAGE_NAMES } from './enums';
import * as types from './types';

class Router {
  private states: StateManager;

  private currentPage: { name: types.PageNames; page: types.Page };

  private rootURL: string;

  constructor(states: StateManager) {
    this.rootURL = this.getRootURL();
    Console.appendText('Create Router');
    this.currentPage = { name: PAGE_NAMES.NONE, page: undefined };
    this.states = states;
    this.states.router = this;
    new Worker(this.states);
    new Dispatcher(this.states);
    this.goToPageByUrlWithHash();
  }

  getRootURL() {
    let rootURL = window.location.href.split('#')[0];
    rootURL = rootURL.split('?')[0];
    const locatePage = rootURL.indexOf('index');
    if (locatePage > 0) rootURL = rootURL.slice(0, locatePage);
    if (rootURL[rootURL.length - 1] === '/') rootURL = rootURL.slice(0, -1);
    return rootURL;
  }

  goToPageByUrlWithHash() {
    const currentLocation = window.location.href;
    const currentLocationParts = currentLocation.split('#');
    if (currentLocationParts.length === 2) this.goToPage(currentLocationParts[1]);
  }

  setHistoryByPage(pageName: types.PageNames) {
    Console.appendText(`Change URL to ${pageName}`);
    if (this.states.states.enableSPAStyleURLAdjustments)
      window.history.replaceState(null, '', `${this.rootURL}/${pageName}`);
  }

  goToPage(pageName: types.PageNames) {
    const newPageName = pageName.toLowerCase();
    if (newPageName === this.currentPage.name) return;
    if (this.currentPage.name !== PAGE_NAMES.NONE) {
      this.currentPage.page?.sellingHTML.remove();
      this.currentPage.name = PAGE_NAMES.NONE;
    }
    if (newPageName === PAGE_NAMES.NONE) return;
    switch (newPageName) {
      case PAGE_NAMES.LOGIN:
        this.currentPage.name = newPageName;
        this.currentPage.page = new Login(document.body, this.states);
        break;

      case PAGE_NAMES.ABOUT:
        this.currentPage.name = newPageName;
        this.currentPage.page = new About(document.body, this.states);
        break;

      case PAGE_NAMES.CHAT:
        this.currentPage.name = newPageName;
        this.currentPage.page = new Chat(document.body, this.states);
        break;

      default:
        this.goToPage(this.identifyingPageByStatus());
    }
    this.setHistoryByPage(newPageName);
  }

  sendToPage(pageName: types.PageNames, message: string) {
    if (!this.currentPage.page) return;
    if (this.currentPage.name === pageName) this.currentPage.page.receiveMessage(message);
  }

  goToPageByStatus() {
    if (this.currentPage.name === PAGE_NAMES.ABOUT) return;
    this.goToPage(this.identifyingPageByStatus());
  }

  identifyingPageByStatus() {
    if (this.states.isUserLogged) return PAGE_NAMES.CHAT;
    return PAGE_NAMES.LOGIN;
  }
}

export default Router;
