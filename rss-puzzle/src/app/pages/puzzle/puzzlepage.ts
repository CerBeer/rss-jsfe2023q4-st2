import App from '../../app';
import { router } from '../../../index';
import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import { templates } from './template';
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
    currentSolvedStatus: ENUMS.wordStatistics.solved,
  };

  private wordStatistics!: string[];

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

    this.unamed.buttonIDontKnow.addEventListener('click', () => {
      this.buttonIDontKnow();
    });

    this.unamed.buttonCheck.addEventListener('click', () => {
      this.checkResult();
    });

    this.unamed.buttonSound.addEventListener('click', () => {
      this.clickButtonClues(this.unamed.buttonSound);
    });

    this.unamed.buttonTranslation.addEventListener('click', () => {
      this.clickButtonClues(this.unamed.buttonTranslation);
    });

    this.unamed.buttonMusic.addEventListener('click', () => {
      this.clickButtonClues(this.unamed.buttonMusic);
    });

    this.unamed.buttonImage.addEventListener('click', () => {
      this.clickButtonClues(this.unamed.buttonImage);
    });

    this.resetStatistics();
    this.initViewClues();
  }

  resetStatistics() {
    this.wordStatistics = [
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
      ENUMS.wordStatistics.unsolved,
    ];
  }

  initViewClues() {
    const currClues = this.app.currStates.clueStates;

    if (currClues.voiceActing) this.unamed.buttonSound.classList.add('active');
    else this.unamed.buttonSound.classList.remove('active');

    if (currClues.translate) this.unamed.buttonTranslation.classList.add('active');
    else this.unamed.buttonTranslation.classList.remove('active');

    if (currClues.image) this.unamed.buttonImage.classList.add('active');
    else this.unamed.buttonImage.classList.remove('active');

    if (currClues.music) this.unamed.buttonMusic.classList.add('active');
    else this.unamed.buttonMusic.classList.remove('active');
  }

  hide() {
    this.page.classList.add('page-none');
  }

  show() {
    this.page.classList.remove('page-none');
  }

  setView() {
    this.currentStates.currentLevel = this.app.currStates.level;
    this.currentStates.currentRound = this.app.currStates.round;
    this.currentStates.currentWord = this.app.currStates.word;

    this.roundData = this.app.dataset.getRoundData(this.currentStates.currentLevel, this.currentStates.currentRound);
    this.setWordData();
    this.setViewSelects();
    this.setViewClues();
    this.createPuzzlePieces();
    this.setViewPieces();
    this.setPiecesCurrentState();
    this.puzzlePieces.updateView();

    const ro = new ResizeObserver(() => {
      this.puzzlePieces.updatePoolSize({
        width: this.unamed.poolPlaceLine.offsetWidth,
        height: this.unamed.poolPlaceLine.offsetHeight,
      });
      this.puzzlePieces.calculateImageMarginTop();
    });
    ro.observe(this.unamed.poolPlaceLine);
  }

  setWordData() {
    this.wordData = this.app.dataset.getWordData(
      this.currentStates.currentLevel,
      this.currentStates.currentRound,
      this.currentStates.currentWord - 1
    );
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

  setViewClues() {
    const currClues = this.app.currStates.clueStates;

    currClues.voiceActing = this.unamed.buttonSound.classList.contains('active');
    if (currClues.voiceActing) this.unamed.buttonSoundPlay.classList.remove('element-hide');
    else this.unamed.buttonSoundPlay.classList.add('element-hide');

    currClues.translate = this.unamed.buttonTranslation.classList.contains('active');
    this.unamed.translation.innerText = this.wordData.textExampleTranslate;
    if (currClues.translate) this.unamed.translation.classList.remove('element-hide');
    else this.unamed.translation.classList.add('element-hide');

    currClues.image = this.unamed.buttonImage.classList.contains('active');

    currClues.music = this.unamed.buttonMusic.classList.contains('active');

    this.app.saveCluesStates();
  }

  createPuzzlePieces() {
    const puzzleParameters: PuzzleParameters = {
      roundData: this.roundData,
      phraseBank: this.app.dataset.getWordsData(this.app.currStates.level, this.app.currStates.round),
      poolSize: { width: this.unamed.poolPlaceLine.offsetWidth, height: this.unamed.poolPlaceLine.offsetHeight },
      poolNumbers: this.poolNumbers,
      poolLines: this.poolLines,
      puzzleShop: this.unamed.shopPuzzle,
      buttonCheck: this.unamed.buttonCheck,
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

  buttonIDontKnow() {
    this.puzzlePieces.setViewLineOrdered(this.currentStates.currentWord);
    this.puzzlePieces.updateButtonCheck();
    this.currentStates.currentSolvedStatus = ENUMS.wordStatistics.solvedWithHint;
  }

  clickButtonClues(clue: HTMLElement) {
    clue.classList.toggle('active');
    // this.unamed.buttonTranslation.classList.toggle('active');
    this.setViewClues();
  }

  checkResult() {
    if (this.unamed.buttonCheck.classList.contains('app-controls-button-disabled')) return;
    const nowOnlyCheck = this.unamed.buttonCheck.innerText === 'Check';
    const lineCorrect = this.puzzlePieces.checkResult();
    if (nowOnlyCheck) {
      this.unamed.translation.classList.remove('element-hide');
      return;
    }
    if (lineCorrect) {
      this.unamed.buttonCheck.innerText = 'Check';
      this.wordStatistics[this.currentStates.currentWord - 1] = this.currentStates.currentSolvedStatus;
      this.currentStates.currentSolvedStatus = ENUMS.wordStatistics.solved;
      this.puzzlePieces.setViewLineOrdered(this.currentStates.currentWord);
      if (this.currentStates.currentWord < 10) {
        this.currentStates.currentWord += 1;
        this.setWordData();
        this.setViewClues();
        this.setPiecesCurrentState();
        this.puzzlePieces.updateView();
      } else {
        this.resetStatistics();
        this.app.currentStateNextRound();
        this.setView();
      }
    }
  }
}

export default PuzzlePage;
