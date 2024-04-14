import { Console } from './utils/console/console';
import StateManager from './services/stateManager/stateManager';
import Login from './pages/login/login';

class App {
  private states;

  private pageLogin;

  private console;

  constructor() {
    this.console = new Console();
    Console.appendText('Start app');
    this.states = new StateManager();
    this.pageLogin = new Login();
  }
}

export default App;
