import { Element } from '../element/element';
import { ElementsDefinitions } from '../element/types';
import * as markup from './markup';
import './console.css';

export class Console extends Element {
  static itThis: Console;

  constructor() {
    if (Console.itThis) return Console.itThis;

    super(markup.console as ElementsDefinitions);

    document.body.appendChild(this.sellingHTML);

    Console.itThis = this;
  }

  static appendText(text: string) {
    if (!Console.itThis) return;
    if (Console.itThis.sellingHTML?.classList.contains('element-hide')) return;

    const consoleText = Console.itThis.specialElements['console-text'];
    consoleText.appendChild(super.createElement(markup.line(text) as ElementsDefinitions));
    consoleText.scrollTop = consoleText.scrollHeight;
  }
}

export default Console;
