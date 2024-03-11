import PuzzlePage from './pages/puzzle/class';

class App {
  private mainPage;

  constructor() {
    this.mainPage = new PuzzlePage();
  }

  start() {
    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.addEventListener('click', () => console.log(this.mainPage));
  }
}

export default App;
