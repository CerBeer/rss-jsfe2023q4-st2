import LoginPage from './pages/login/class';
import PuzzlePage from './pages/puzzle/class';

class App {
  private loginPage;

  private puzzlePage;

  constructor() {
    this.loginPage = new LoginPage();

    this.puzzlePage = new PuzzlePage();
  }

  start() {
    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.addEventListener('click', () => console.log(this.loginPage));
  }
}

export default App;
