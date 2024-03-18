import { Definition, createElement } from '../../utils/elements';
import { templates } from './template';
import { WorldCollectionLevelLevelData } from '../../components/dataset/dataset';
import { ENUMS } from '../../data/enums';
import { shuffleArray } from '../../utils/shuffle';

export type PuzzleParameters = {
  roundData: WorldCollectionLevelLevelData;
  phraseBank: string[][];
  poolSize: { width: number; height: number };
  poolNumbers: HTMLElement[];
  poolLines: HTMLElement[];
  puzzleShop: HTMLElement;
  buttonCheck: HTMLElement;
};

export type PieceParameters = {
  word: string;
  width: number;
  lineNumber: number;
  wordNumber: number;
  indent: number;
  poolSize: { width: number; height: number };
  imgSize: { width: number; height: number; marginTop: number };
  background: string;
};

class Piece {
  private implementation: HTMLElement;

  private pieceParameters: PieceParameters;

  constructor(pieceParameters: PieceParameters) {
    this.pieceParameters = pieceParameters;
    const newElement = templates.templatePiece as Definition;
    newElement.text = `${this.pieceParameters.word.trim()}`;
    this.implementation = createElement(newElement);
    this.implementation.style.width = `${this.pieceParameters.width}px`;
    this.implementation.style.backgroundImage = `url(${this.pieceParameters.background})`;
    this.implementation.style.backgroundSize = `${this.pieceParameters.poolSize.width}px`;
  }

  calculateBackgroundPosition() {
    const bgPosW = -this.pieceParameters.indent;
    const bgPosH =
      this.pieceParameters.imgSize.marginTop +
      (this.pieceParameters.poolSize.height / 10) * -this.pieceParameters.lineNumber;
    this.implementation.style.backgroundPosition = `${bgPosW}px ${bgPosH}px`;
  }

  get imp() {
    return this.implementation;
  }

  get text() {
    return this.pieceParameters.word;
  }

  get width() {
    return this.pieceParameters.width;
  }

  get number() {
    return this.pieceParameters.wordNumber;
  }

  set indent(indent: number) {
    this.pieceParameters.indent = indent;
  }

  set width(width: number) {
    this.pieceParameters.width = width;
    this.implementation.style.width = `${this.pieceParameters.width}px`;
  }
}

class PuzzlePieces {
  private poolSizeBasic = {
    width: 1220,
    height: 550,
  };

  private imgSize = {
    width: 1220,
    height: 550,
    marginTop: 0,
  };

  private puzzleParameters: PuzzleParameters;

  private background: string;

  private pieces: Piece[][];

  private wordStatistics!: string[];

  private currentWord!: number;

  private currentResultLine!: HTMLElement;

  constructor(puzzleParameters: PuzzleParameters) {
    this.puzzleParameters = puzzleParameters;
    this.background = this.puzzleParameters.roundData.imageSrc;

    const piecesNew = [];
    for (let line = 0; line < 10; line += 1) {
      const piecesNewLine = [];
      const wordsPull = this.puzzleParameters.phraseBank[line].map((word) => ` ${word} `);
      const widthOneChar = this.puzzleParameters.poolSize.width / wordsPull.join('').length;
      let indent = 0;
      for (let wordIndex = 0; wordIndex < wordsPull.length; wordIndex += 1) {
        const currWord = wordsPull[wordIndex];
        const currPieceLength = currWord.length * widthOneChar;
        const newElement = new Piece({
          word: currWord,
          width: currPieceLength,
          lineNumber: line,
          wordNumber: wordIndex,
          indent: indent,
          poolSize: this.puzzleParameters.poolSize,
          imgSize: this.imgSize,
          background: this.background,
        });
        newElement.imp.addEventListener('click', (event) => {
          this.pieceClick(event);
        });
        piecesNewLine.push(newElement);
        indent += currPieceLength;
      }
      piecesNew.push(piecesNewLine);
    }
    this.pieces = piecesNew;
    this.getBackgroundSize();
  }

  getBackgroundSize() {
    const image = new Image();
    image.src = this.background;
    image.onload = () => {
      this.imgSize.width = image.width;
      this.imgSize.height = image.height;
      this.calculateImageMarginTop();
    };
  }

  calculateImageMarginTop() {
    this.imgSize.marginTop =
      (this.puzzleParameters.poolSize.height -
        this.imgSize.height * (this.puzzleParameters.poolSize.width / this.imgSize.width)) /
      2;
    for (let line = 0; line < 10; line += 1) {
      const wordsPull = this.puzzleParameters.phraseBank[line].map((word) => ` ${word} `);
      const widthOneChar = this.puzzleParameters.poolSize.width / wordsPull.join('').length;
      let indent = 0;
      for (let wordIndex = 0; wordIndex < wordsPull.length; wordIndex += 1) {
        const currWord = wordsPull[wordIndex];
        const currPieceLength = currWord.length * widthOneChar;
        const newElement = this.pieces[line][wordIndex];
        newElement.indent = indent;
        newElement.width = currPieceLength;
        indent += currPieceLength;
      }
    }
    this.pieces.forEach((line) => line.forEach((piece) => piece.calculateBackgroundPosition()));
  }

  setViewLines() {
    for (let i = 0; i < 10; i += 1) {
      const newElements = this.pieces[i].map((piece) => piece.imp);
      const parentElement = this.puzzleParameters.poolLines[i];
      parentElement.replaceChildren(...newElements);
    }
  }

  setViewLineOrdered(line: number) {
    const newElements = this.pieces[line - 1].map((piece) => piece.imp);
    const parentElement = this.puzzleParameters.poolLines[line - 1];
    parentElement.replaceChildren(...newElements);
  }

  setWordStatistics(wordStatistics: string[]) {
    this.wordStatistics = wordStatistics;
  }

  setCurrentWord(currentWord: number) {
    this.currentWord = currentWord;
    this.currentResultLine = this.puzzleParameters.poolLines[this.currentWord];
  }

  updateView() {
    for (let i = 0; i < 10; i += 1) {
      this.puzzleParameters.poolNumbers[i].classList.remove('element-hide');
      this.puzzleParameters.poolNumbers[i].classList.remove('marked-element');
      this.puzzleParameters.poolNumbers[i].classList.remove('solved-with-hint');
      this.puzzleParameters.poolLines[i].classList.remove('element-hide');
      this.puzzleParameters.poolLines[i].classList.remove('marked-line');
      if (i === this.currentWord - 1) {
        this.puzzleParameters.poolNumbers[i].classList.add('marked-element');
        this.puzzleParameters.poolLines[i].classList.add('marked-line');
        let newElements = this.pieces[i].map((piece) => piece.imp);
        newElements = shuffleArray(newElements);
        const parentElement = this.puzzleParameters.puzzleShop;
        parentElement.replaceChildren(...newElements);
      } else if (this.wordStatistics[i] === ENUMS.wordStatistics.unsolved) {
        this.puzzleParameters.poolNumbers[i].classList.add('element-hide');
        this.puzzleParameters.poolLines[i].classList.add('element-hide');
      } else if (this.wordStatistics[i] === ENUMS.wordStatistics.solvedWithHint) {
        this.puzzleParameters.poolNumbers[i].classList.add('solved-with-hint');
      }
    }
    this.updateButtonCheck();
  }

  updatePoolSize(poolSize: { width: number; height: number }) {
    this.puzzleParameters.poolSize = poolSize;
  }

  pieceClick(e: Event) {
    const clickedElement = e.target as Node;
    if (this.puzzleParameters.puzzleShop.contains(clickedElement)) {
      this.puzzleParameters.poolLines[this.currentWord - 1].appendChild(clickedElement);
    } else if (this.puzzleParameters.poolLines[this.currentWord - 1].contains(clickedElement)) {
      this.puzzleParameters.puzzleShop.appendChild(clickedElement);
      (clickedElement as HTMLElement).classList.remove('marked-piece');
    }
    this.puzzleParameters.buttonCheck.innerText = 'Check';
    this.updateButtonCheck();
  }

  updateButtonCheck() {
    if (this.puzzleParameters.puzzleShop.childNodes.length > 0) {
      this.puzzleParameters.buttonCheck.classList.add('app-controls-button-disabled');
    } else {
      this.puzzleParameters.buttonCheck.classList.remove('app-controls-button-disabled');
    }
  }

  checkResult() {
    let result = true;
    this.puzzleParameters.poolLines[this.currentWord - 1].childNodes.forEach((piece, index) => {
      const correct = this.pieces[this.currentWord - 1][index].text.trim() === piece.textContent?.trim();
      if (correct) this.pieces[this.currentWord - 1][index].imp.classList.remove('marked-piece');
      else this.pieces[this.currentWord - 1][index].imp.classList.add('marked-piece');
      result = result && correct;
    });
    if (result) this.puzzleParameters.buttonCheck.innerText = 'Continue';
    else this.puzzleParameters.buttonCheck.innerText = 'Check';
    return result;
  }
}

export default PuzzlePieces;
