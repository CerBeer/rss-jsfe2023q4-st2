import { Console } from './utils/console/console';
import { GeneratorID } from './utils/generatorID/generatorID';
import StateManager from './services/stateManager/stateManager';
import Router from './services/router/router';

class App {
  private router;

  private states;

  private console;

  private generatorID;

  constructor() {
    this.console = new Console();
    Console.appendText('Start app');
    this.generatorID = new GeneratorID();
    this.states = new StateManager();
    this.router = new Router(this.states);
    // this.pageAbout.putAway();
  }
}

export default App;
