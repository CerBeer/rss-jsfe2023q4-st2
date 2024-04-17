import Login from '../../pages/login/login';
import About from '../../pages/about/about';
import Chat from '../../pages/chat/chat';
import Splash from '../../pages/splash/splash';
import { Storage } from '../../utils/storage/storage';
import Router from '../router/router';
import Worker from '../worker/worker';
import Dispatcher from '../dispatcher/dispatcher';

export type LoggedUser = {
  login: string;
  password: string;
};

export type ServerInfo = {
  URL: string;
};

export type CurrentPage = Login | About | Chat | undefined;

export type State = {
  lastQueryLoginID: number;
  isUserLogged: boolean;
  router: Router | undefined;
  worker: Worker | undefined;
  dispatcher: Dispatcher | undefined;
  splashPage: Splash;
  session: Storage;
};

export type Session = {
  serverInfo: ServerInfo;
  loggedUser: LoggedUser;
};
