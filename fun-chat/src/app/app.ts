import { Console } from './utils/console/console';
import StateManager from './services/stateManager/stateManager';
import Login from './pages/login/login';
import About from './pages/about/about';
import Chat from './pages/chat/chat';

class App {
  private states;

  private pageLogin;

  private pageAbout;

  private pageChat;

  private console;

  constructor() {
    this.console = new Console();
    Console.appendText('Start app');
    this.states = new StateManager();
    this.pageLogin = new Login(document.body);
    this.pageAbout = new About(document.body);
    this.pageChat = new Chat(document.body);
    // this.pageAbout.putAway();
  }
}

export default App;
