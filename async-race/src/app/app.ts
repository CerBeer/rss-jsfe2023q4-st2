import GaragePage from './pages/garage/garagepage';

class App {
  private pageGarage;

  constructor() {
    this.pageGarage = new GaragePage();
  }

  initCurrentStates() {}

  get garagePage() {
    return this.pageGarage;
  }
}

export default App;
