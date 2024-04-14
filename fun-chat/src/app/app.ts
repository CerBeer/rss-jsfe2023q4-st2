import { Console } from './utils/console/console';
import StateManager from './services/stateManager/stateManager';
import Login from './pages/login/login';
import About from './pages/about/about';

class App {
  private states;

  private pageLogin;

  private pageAbout;

  private console;

  constructor() {
    this.console = new Console();
    Console.appendText('Start app');
    this.states = new StateManager();
    this.pageLogin = new Login(document.body);
    this.pageAbout = new About(document.body);
    this.pageAbout.putAway();
  }
}

export default App;
