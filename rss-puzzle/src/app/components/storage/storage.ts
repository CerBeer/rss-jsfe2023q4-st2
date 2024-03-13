export type StorageData = number | string | boolean | object;
export type StorageObject = { [key: string]: StorageData };

export class Storage {
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

  setVal(key: string, value: StorageData) {
    this.values[key] = value;
  }

  getVal(key: string) {
    return this.values[key];
  }

  constructor(data: StorageObject) {
    this.values = {};
    const keysInit = Object.keys(data);
    const keysStorage = Object.keys(localStorage);
    keysInit.forEach((key) => {
      this.values[key] = data[key];
      if (keysStorage.indexOf(key) < 0) {
        this.save(key);
      } else {
        this.load(key);
      }
    });
  }
}

export default Storage;
