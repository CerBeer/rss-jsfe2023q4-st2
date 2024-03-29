import StateManager from './services/stateManager/stateManager';
import Header from './pages/header/header';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import Footer from './pages/footer/footer';
import { Console } from './pages/console';

class App {
  private stateManager;

  private pageHeader;

  private pageGarage;

  private pageWinners;

  private pageFooter;

  private console;

  constructor() {
    this.stateManager = new StateManager();
    this.pageHeader = new Header(this.stateManager.states.header);
    this.pageGarage = new Garage(this.stateManager.states.garage, this.stateManager.states.winners);
    this.pageWinners = new Winners(this.stateManager.states.winners);
    this.pageFooter = new Footer();
    this.initCurrentStates();
    this.creatingEventHandlers();
    this.console = new Console();
  }

  initCurrentStates() {
    this.pageGarage.show();
  }

  creatingEventHandlers() {
    this.stateManager.states.header.specialElements['tab-button-garage'].addEventListener('click', () => {
      this.pageWinners.hide();
      this.pageGarage.show();
    });
    this.stateManager.states.header.specialElements['tab-button-winners'].addEventListener('click', () => {
      this.pageGarage.hide();
      this.pageWinners.show();
    });
  }

  get garagePage() {
    return this.pageGarage;
  }

  get headerPage() {
    return this.pageHeader;
  }
}

export default App;
