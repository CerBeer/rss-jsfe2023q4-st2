export type StorageData = number | string | boolean | { [key: string]: string };
export type StorageObject = { [key: string]: StorageData };

export class Storage {
  private initValues: StorageObject;

  private values: StorageObject;

  save(key: string) {
    localStorage.setItem(key, JSON.stringify(this.values[key]));
  }

  load(key: string) {
    this.values[key] = JSON.parse(localStorage.getItem(key) || '');
  }

  saveAll() {
    const keys = Object.keys(this.values);
    keys.forEach((key) => {
      this.save(key);
    });
  }

  loadAll() {
    const keysInit = Object.keys(this.initValues);
    this.values = {};
    const keysStorage = Object.keys(localStorage);
    keysInit.forEach((key) => {
      this.values[key] = this.initValues[key];
      if (keysStorage.indexOf(key) >= 0) {
        this.load(key);
      }
    });
  }

  setVal(key: string, value: StorageData) {
    this.values[key] = value;
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

  constructor(initValues: StorageObject) {
    this.initValues = initValues;
    const keysInit = Object.keys(initValues);
    keysInit.forEach((key) => {
      this.initValues[key] = initValues[key];
    });
    this.values = {};
    const keysStorage = Object.keys(localStorage);
    keysInit.forEach((key) => {
      this.values[key] = initValues[key];
      if (keysStorage.indexOf(key) < 0) {
        this.save(key);
      } else {
        this.load(key);
      }
    });
  }
}

export default Storage;
