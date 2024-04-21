import Login from '../../pages/login/login';
import About from '../../pages/about/about';
import Chat from '../../pages/chat/chat';
import Splash from '../../pages/splash/splash';
import { Storage } from '../../utils/storage/storage';
import Router from '../router/router';
import Worker from '../worker/worker';
import Dispatcher from '../dispatcher/dispatcher';
import ChatService from '../chatService/chatService';

export type LoggedUser = {
  login: string;
  password: string;
};

export type ServerInfo = {
  URL: string;
};

export type CurrentPage = Login | About | Chat | undefined;

export type State = {
  enableSPAStyleURLAdjustments: boolean;
  lastQueryLoginID: number;
  isUserLogged: boolean;
  router: Router | undefined;
  worker: Worker | undefined;
  dispatcher: Dispatcher | undefined;
  chatService: ChatService | undefined;
  splashPage: Splash;
  session: Storage;
};

export type Session = {
  serverInfo: ServerInfo;
  loggedUser: LoggedUser;
};
