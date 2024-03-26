import StateManager from './services/stateManager/stateManager';
import Header from './pages/header/header';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import Footer from './pages/footer/footer';

class App {
  private stateManager;

  private pageHeader;

  private pageGarage;

  private pageWinners;

  private pageFooter;

  constructor() {
    this.stateManager = new StateManager();
    this.pageHeader = new Header();
    this.pageGarage = new Garage(this.stateManager.states.garage);
    this.pageWinners = new Winners(this.stateManager.states.winners);
    this.pageFooter = new Footer();
    this.initCurrentStates();
  }

  initCurrentStates() {
    this.pageGarage.neno();
  }

  get garagePage() {
    return this.pageGarage;
  }

  get headerPage() {
    return this.pageHeader;
  }
}

export default App;
