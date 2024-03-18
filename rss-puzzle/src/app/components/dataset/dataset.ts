import { datasetSettings } from './settings';
import { getDataSet } from '../dataset/loadDataset';

export type WorldCollectionLevelWord = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type WorldCollectionLevelLevelData = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

export type WorldCollectionLevel =
  | {
      rounds: {
        levelData: WorldCollectionLevelLevelData;
        words: WorldCollectionLevelWord[];
      }[];
      roundsCount: number;
    }
  | Record<string, never>;

export class Dataset {
  private settings;

  private dataset: { isLoaded: boolean; isError: boolean; data: WorldCollectionLevel | Record<string, never> }[];

  constructor() {
    this.settings = datasetSettings;
    this.dataset = [];
    for (let i = 0; i <= this.settings.allLevels; i += 1) {
      this.dataset[i] = { isLoaded: false, isError: false, data: {} };
    }
    for (let i = 1; i <= this.settings.allLevels; i += 1) {
      this.loadDataset(i);
    }
  }

  loadDataset(level: number) {
    if (this.dataset[level].isLoaded) return;
    const url = `${this.settings.paths.rootPath}${this.settings.paths.dataPath}wordCollectionLevel${level}.json`;
    getDataSet(level, url, this);
  }

  setDataset(level: number, dataSet: WorldCollectionLevel | undefined) {
    if (dataSet === undefined) {
      this.dataset[level].isLoaded = false;
      this.dataset[level].isError = true;
      this.loadDataset(level);
    } else {
      this.dataset[level].isLoaded = true;
      this.dataset[level].isError = false;
      this.dataset[level].data = dataSet;
    }
  }

  isLoaded(level: number) {
    return this.dataset[level].isLoaded;
  }

  isAllLoaded() {
    let result = true;
    for (let i = 1; i <= this.settings.allLevels; i += 1) {
      result = result && this.isLoaded(i);
      // if (this.isLoaded(i)) console.log(i, this.dataset[i].data.rounds[0].levelData.id);
    }
    return result;
  }

  levelLength(level: number) {
    if (!this.isLoaded(level)) return -1;
    return this.dataset[level].data.roundsCount;
  }

  get allLevels() {
    return this.settings.allLevels;
  }

  getRoundData(level: number, round: number) {
    const dataRound = this.dataset[level].data.rounds[round - 1].levelData;
    const roundData: WorldCollectionLevelLevelData = {
      id: dataRound.id,
      name: dataRound.name,
      imageSrc: `${this.settings.paths.rootPath}${this.settings.paths.imagesPath}${dataRound.imageSrc}`,
      cutSrc: `${this.settings.paths.rootPath}${this.settings.paths.imagesPath}${dataRound.cutSrc}`,
      author: dataRound.author,
      year: dataRound.year,
    };
    return roundData;
  }

  getWordData(level: number, round: number, word: number) {
    const dataWord = this.dataset[level].data.rounds[round - 1].words[word];
    const wordData: WorldCollectionLevelWord = {
      audioExample: `${this.settings.paths.rootPath}${this.settings.paths.filesPath}${dataWord.audioExample}`,
      textExample: dataWord.textExample,
      textExampleTranslate: dataWord.textExampleTranslate,
      id: dataWord.id,
      word: dataWord.word,
      wordTranslate: dataWord.wordTranslate,
    };
    return wordData;
  }

  getWordsData(level: number, round: number): string[][] {
    const dataWords = this.dataset[level].data.rounds[round - 1].words;
    const result = [];
    for (let i = 0; i < dataWords.length; i += 1) {
      result.push(dataWords[i].textExample.split(' '));
    }
    return result;
  }
}
