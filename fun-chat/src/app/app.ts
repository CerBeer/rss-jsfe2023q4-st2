import { Console } from './utils/console/console';
import { GeneratorID } from './utils/generatorID/generatorID';
import StateManager from './services/stateManager/stateManager';
import Router from './services/router/router';

class App {
  private states;

  private console;

  private generatorID;

  constructor() {
    this.console = new Console();
    Console.appendText('Start app');
    this.generatorID = new GeneratorID();
    this.states = new StateManager();
    new Router(this.states);
  }
}

export default App;
