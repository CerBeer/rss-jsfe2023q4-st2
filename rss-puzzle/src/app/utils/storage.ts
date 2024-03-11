type StorageData = number | string | boolean | object;
type StorageObject = { [key: string]: StorageData };

class Storage {
  private initValues: StorageObject;

  static save(key: string, value: StorageData) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static load(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  constructor(data: StorageObject) {
    this.initValues = {};
    const keysInit = Object.keys(data);
    const keysStorage = Object.keys(localStorage);
    keysInit.forEach((key) => {
      if (keysStorage.indexOf(key) < 0) Storage.save(key, data[key]);
      this.initValues[key] = data[key];
    });
  }
}

export default Storage;
