import { Element } from '../element/element';
import { ElementsDefinitions } from '../element/types';
import * as markup from './markup';
import { settings } from './settings';
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
    let childToDelete = consoleText.childNodes.length - settings.maxLines;
    while (childToDelete > 0) {
      consoleText.removeChild(consoleText.childNodes[0]);
      childToDelete -= 1;
    }

    const newChild = Element.createElement(markup.line(text) as ElementsDefinitions);
    consoleText.appendChild(newChild);
    consoleText.scrollTop = consoleText.scrollHeight;
  }
}

export default Console;
