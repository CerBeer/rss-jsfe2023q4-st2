import { defaultState } from './data/default';
import { currentState } from './data/current';
import { Storage } from './components/storage/storage';
import { Dataset } from './components/dataset/dataset';
import LoginPage from './pages/login/loginpage';
import StartPage from './pages/start/startpage';
import PuzzlePage from './pages/puzzle/puzzlepage';

class App {
  private pageLogin;

  private pageStart;

  private pagePuzzle;

  private appStates;

  private appDataset;

  private currentStates;

  constructor() {
    this.appStates = new Storage(defaultState);
    this.currentStates = currentState;
    this.initCurrentStates();
    this.pageLogin = new LoginPage(this.appStates);
    this.pageStart = new StartPage(this.appStates);
    this.pagePuzzle = new PuzzlePage(this);
    this.appDataset = new Dataset();
  }

  initCurrentStates() {
    const puzzleStates = this.appStates.getVal('puzzleStates') as { [key: string]: string };
    this.currentStates.level = parseInt(puzzleStates.lastLevel);
    this.currentStates.round = parseInt(puzzleStates.lastRound);
    this.currentStates.word = parseInt(puzzleStates.lastWord);

    const clueStates = this.appStates.getVal('clueStates') as { [key: string]: string };
    this.currentStates.clueStates.voiceActing = clueStates.voiceActing === 'true';
    this.currentStates.clueStates.translate = clueStates.translate === 'true';
    this.currentStates.clueStates.music = clueStates.music === 'true';
    this.currentStates.clueStates.image = clueStates.image === 'true';
  }

  saveCurrentStates() {
    const puzzleStates = this.appStates.getVal('puzzleStates') as { [key: string]: string };
    puzzleStates.lastLevel = `${this.currentStates.level}`;
    puzzleStates.lastRound = `${this.currentStates.round}`;
    puzzleStates.lastWord = `${this.currentStates.word}`;
    this.appStates.setVal('puzzleStates', puzzleStates);
    this.appStates.save('puzzleStates');
  }

  saveCluesStates() {
    const clueStates = this.appStates.getVal('clueStates') as { [key: string]: string };
    clueStates.voiceActing = `${this.currentStates.clueStates.voiceActing}`;
    clueStates.translate = `${this.currentStates.clueStates.translate}`;
    clueStates.music = `${this.currentStates.clueStates.music}`;
    clueStates.image = `${this.currentStates.clueStates.image}`;
    this.appStates.setVal('clueStates', clueStates);
    this.appStates.save('clueStates');
  }

  currentStateNextRound() {
    this.saveCurrentStates();

    this.currentStates.round += 1;
    this.currentStates.word = 1;

    if (this.currentStates.level === 0) {
      this.currentStates.level = 1;
    }
    if (this.currentStates.round > this.appDataset.levelLength(this.currentStates.level)) {
      this.currentStates.level += 1;
      this.currentStates.round = 1;
      this.currentStates.word = 1;
    }
    if (this.currentStates.level > this.appDataset.allLevels) {
      this.currentStates.level = 1;
      this.currentStates.round = 1;
      this.currentStates.word = 1;
    }
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

  get states() {
    return this.appStates;
  }

  get currStates() {
    return this.currentStates;
  }

  get dataset() {
    return this.appDataset;
  }
}

export default App;
