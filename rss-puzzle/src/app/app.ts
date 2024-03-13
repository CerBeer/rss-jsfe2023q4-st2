import { defaultState } from './data/default';
import { Storage } from './components/storage/storage';
import LoginPage from './pages/login/class';
import StartPage from './pages/start/class';
import PuzzlePage from './pages/puzzle/class';

class App {
  private pageLogin;

  private pageStart;

  private pagePuzzle;

  private appStates;

  constructor() {
    this.appStates = new Storage(defaultState);
    this.pageLogin = new LoginPage(this.appStates);
    this.pageStart = new StartPage(this.appStates);
    this.pagePuzzle = new PuzzlePage();
  }

  get loginPage() {
    return this.pageLogin;
  }

  get puzzlePage() {
    return this.pagePuzzle;
  }

  get startPage() {
    return this.pageStart;
  }

  get state() {
    return this.appStates;
  }
}

export default App;
