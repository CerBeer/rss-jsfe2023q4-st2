import { Console } from '../console/console';

export class GeneratorID {
  static itThis: GeneratorID;

  static currentNumber: number;

  constructor() {
    if (GeneratorID.itThis) return GeneratorID.itThis;
    GeneratorID.itThis = this;
    const currenDate = new Date();
    GeneratorID.currentNumber =
      currenDate.getDay() * 24 * 60 * 60 +
      currenDate.getHours() * 60 * 60 +
      currenDate.getMinutes() * 60 +
      currenDate.getSeconds();
    Console.appendText(`Start GeneratorID from ${GeneratorID.currentNumber}`);
  }

  static next() {
    GeneratorID.currentNumber = GeneratorID.currentNumber + 1;
    return `${GeneratorID.currentNumber}`;
  }
}

export default GeneratorID;
