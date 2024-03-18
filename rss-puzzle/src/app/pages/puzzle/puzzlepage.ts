import App from '../../app';
import { router } from '../../../index';
import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import { templates } from './template';
import { shuffleArray } from '../../utils/shuffle';
import { WorldCollectionLevelWord, WorldCollectionLevelLevelData } from '../../components/dataset/dataset';
import PuzzlePieces, { PuzzleParameters } from './pieces';
import { ENUMS } from '../../data/enums';
import './style.css';

class PuzzlePage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  private app: App;

  private roundData!: WorldCollectionLevelLevelData;

  private wordData!: WorldCollectionLevelWord;

  private phraseReference!: string[];

  private phraseResult!: string[];

  private phraseBank!: string[];

  private puzzlePieces!: PuzzlePieces;

  private poolNumbers!: HTMLElement[];

  private poolLines!: HTMLElement[];

  private currentStates = {
    currentLevel: 1,
    currentRound: 1,
    currentWord: 1,
  };

  private wordStatistics = [
    ENUMS.wordStatistics.solved,
    ENUMS.wordStatistics.solved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
    ENUMS.wordStatistics.unsolved,
  ];

  constructor(app: App) {
    this.app = app;
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    const poolNumbers = [];
    for (let i = 1; i <= 10; i += 1) {
      const newElement = templates.templatePlaceNumber as Definition;
      newElement.text = `${i}`;
      const newElementImp = createElement(newElement);
      poolNumbers.push(newElementImp);
      this.unamed.poolPlaceNumber.appendChild(newElementImp);
    }
    this.poolNumbers = poolNumbers;

    const poolLines = [];
    for (let i = 1; i <= 10; i += 1) {
      const newElement = templates.templatePlaceLine as Definition;
      const newElementImp = createElement(newElement);
      this.unamed.poolPlaceLine.appendChild(newElementImp);
      poolLines.push(newElementImp);
    }
    this.poolLines = poolLines;

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);

    this.unamed.buttonLogOut.addEventListener('click', () => {
      router.logout();
    });
  }

  setView() {
    this.currentStates.currentLevel = this.app.currStates.level;
    this.currentStates.currentRound = this.app.currStates.round;
    this.currentStates.currentWord = this.app.currStates.word;
    this.roundData = this.app.dataset.getRoundData(this.currentStates.currentLevel, this.currentStates.currentRound);
    this.wordData = this.app.dataset.getWordData(
      this.currentStates.currentLevel,
      this.currentStates.currentRound,
      this.currentStates.currentWord - 1
    );
    this.setViewSelects();
    this.setViewClues();
    this.setViewPool();
    this.createPuzzlePieces();
    this.setViewPieces();
    this.setPiecesCurrentState();
    this.puzzlePieces.updateView();
  }

  setViewSelects() {
    this.unamed.currentLevel.innerHTML = '';
    const countLevel = this.app.dataset.allLevels;
    const currentLevel = this.app.currStates.level;
    for (let i = 1; i <= countLevel; i += 1) {
      const newElement = templates.templateOptionPage as Definition;
      newElement.text = `${i}`;
      newElement.attributes = { value: `${i}` };
      const nevElementImp = createElement(newElement) as HTMLOptionElement;
      if (i === currentLevel) nevElementImp.selected = true;
      this.unamed.currentLevel.appendChild(nevElementImp);
    }
    this.unamed.currentPage.innerHTML = '';
    const countRound = this.app.dataset.levelLength(this.app.currStates.level);
    const currentRound = this.app.currStates.round;
    for (let i = 1; i <= countRound; i += 1) {
      const newElement = templates.templateOptionPage as Definition;
      newElement.text = `${i}`;
      newElement.attributes = { value: `${i}` };
      const nevElementImp = createElement(newElement) as HTMLOptionElement;
      if (i === currentRound) nevElementImp.selected = true;
      this.unamed.currentPage.appendChild(nevElementImp);
    }
  }

  setViewPool() {
    // this.unamed.poolPlaceLine.style.backgroundImage = `url('${this.roundData.imageSrc}')`;
    // TODO implement this: set view of line with completed word
  }

  setViewClues() {
    this.unamed.translation.innerText = this.wordData.textExampleTranslate;
  }

  setViewWordBank() {
    // this.unamed.shopPuzzle.innerHTML = '';
    // this.phraseBank.forEach((word) => {
    //   const newElement = templates.templatePiece as Definition;
    //   newElement.text = `${word}`;
    //   this.unamed.shopPuzzle.appendChild(createElement(newElement));
    // });
  }

  startWord() {
    this.phraseReference = this.wordData.textExample.split(' ');
    this.phraseResult = [];
    this.phraseBank = shuffleArray(this.phraseReference!);
    this.setViewWordBank();
    return;
  }

  hide() {
    this.page.classList.add('page-none');
  }

  show() {
    this.page.classList.remove('page-none');
  }

  createPuzzlePieces() {
    const puzzleParameters: PuzzleParameters = {
      roundData: this.roundData,
      phraseBank: this.app.dataset.getWordsData(this.app.currStates.level, this.app.currStates.round),
      poolSize: { width: this.unamed.poolPlaceLine.offsetWidth, height: this.unamed.poolPlaceLine.offsetHeight },
      poolNumbers: this.poolNumbers,
      poolLines: this.poolLines,
      puzzleShop: this.unamed.shopPuzzle,
    };
    this.puzzlePieces = new PuzzlePieces(puzzleParameters);
  }

  setViewPieces() {
    this.puzzlePieces.setViewLines();
  }

  setPiecesCurrentState() {
    this.puzzlePieces.setWordStatistics(this.wordStatistics);
    this.puzzlePieces.setCurrentWord(this.currentStates.currentWord);
  }
}

export default PuzzlePage;
