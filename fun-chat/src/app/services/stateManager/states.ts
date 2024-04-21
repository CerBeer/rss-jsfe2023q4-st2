import { State, Session } from '../../services/stateManager/types';
import { Storage } from '../../utils/storage/storage';
import Splash from '../../pages/splash/splash';

const session: Session = {
  loggedUser: {
    login: 'Ellff1',
    password: 'Ellff1',
  },
  serverInfo: {
    URL: 'ws://127.0.0.1:4000/',
    // URL: 'wss://rs-chat-d66c4fe06a3a.herokuapp.com/',
  },
};

export const states: State = {
  enableSPAStyleURLAdjustments: false,
  lastQueryLoginID: 0,
  isUserLogged: false,
  router: undefined,
  worker: undefined,
  dispatcher: undefined,
  chatService: undefined,
  splashPage: new Splash(document.body),
  session: new Storage(sessionStorage, session),
};
