import { defaultState } from './data/default';
import { Storage } from './components/storage/storage';
import LoginPage from './pages/login/class';
import PuzzlePage from './pages/puzzle/class';

class App {
  private loginPage;

  private puzzlePage;

  private states;

  constructor() {
    this.states = new Storage(defaultState);
    this.loginPage = new LoginPage(this.states);
    this.puzzlePage = new PuzzlePage();
  }

  start() {
    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.addEventListener('click', () => console.log(this.loginPage));
  }
}

export default App;
