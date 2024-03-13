import { defaultState } from './data/default';
import { Storage } from './components/storage/storage';
import { Router } from './components/router/router';
import LoginPage from './pages/login/class';
import PuzzlePage from './pages/puzzle/class';

class App {
  private pageLogin;

  private pagePuzzle;

  private appStates;

  private router;

  constructor() {
    this.appStates = new Storage(defaultState);
    this.pageLogin = new LoginPage(this.appStates);
    this.pagePuzzle = new PuzzlePage();
    this.router = new Router();
  }

  start() {
    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.addEventListener('click', () => console.log(this.loginPage));
  }

  get loginPage() {
    return this.pageLogin;
  }

  get puzzlePage() {
    return this.pagePuzzle;
  }

  get route() {
    return this.router;
  }

  get state() {
    return this.appStates;
  }
}

export default App;
