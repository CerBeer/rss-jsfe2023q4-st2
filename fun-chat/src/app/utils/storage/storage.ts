import { Console } from '../console/console';
export type StorageData = number | string | boolean | { [key: string]: string };
export type StorageObject = { [key: string]: StorageData };
export type StorageType = typeof localStorage | typeof sessionStorage;

export class Storage {
  private initValues: StorageObject;

  private values: StorageObject;

  private storage: StorageType;

  constructor(storage: StorageType, initValues: StorageObject) {
    this.storage = storage;
    this.initValues = initValues;
    const keysInit = Object.keys(initValues);
    keysInit.forEach((key) => {
      this.initValues[key] = initValues[key];
    });
    this.values = {};
    const keysStorage = Object.keys(storage);
    keysInit.forEach((key) => {
      this.values[key] = initValues[key];
      if (keysStorage.indexOf(key) < 0) {
        this.save(key);
      } else {
        this.load(key);
      }
    });
    Console.appendText('Create Storage');
  }

  save(key: string) {
    this.storage.setItem(key, JSON.stringify(this.values[key]));
  }

  load(key: string) {
    this.values[key] = JSON.parse(this.storage.getItem(key) || '');
  }

  setVal(key: string, value: StorageData) {
    this.values[key] = value;
    this.save(key);
  }

  getVal(key: string) {
    return this.values[key];
  }

  resetValues() {
    this.values = {};
    const keysInit = Object.keys(this.initValues);
    keysInit.forEach((key) => {
      this.values[key] = this.initValues[key];
    });
  }

  isEmptyVal(key: string) {
    const val = this.getVal(key);
    let result = true;
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      keys.forEach((k) => {
        result = result && !val[k];
      });
    } else {
      result = !val;
    }
    return result;
  }
}

export default Storage;
