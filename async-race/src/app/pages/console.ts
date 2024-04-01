import { ElementsDefinitions, createElement } from '../utils/elements';
import { SpecialElements } from './types';

export class Console {
  static itThis: Console;

  private SpecialElements: SpecialElements = {};

  private sellingHTML;

  constructor() {
    if (Console.itThis) return Console.itThis;
    const markup = {
      tag: 'div',
      text: ``,
      attributes: {},
      classes: 'console-window element-hide',
      child: [
        {
          tag: 'code',
          text: '',
          attributes: { identifier: 'console-text' },
          classes: 'console-window-text',
          child: [],
        },
      ],
    };

    this.sellingHTML = createElement(markup as ElementsDefinitions, this.SpecialElements);

    document.body.appendChild(this.sellingHTML);

    Console.itThis = this;
  }

  static appendText(text: string) {
    if (!Console.itThis) return;
    if (Console.itThis.sellingHTML?.classList.contains('element-hide')) return;
    const markup = {
      tag: 'p',
      text: `${Math.round(performance.now())}: ${text}`,
      attributes: {},
      classes: 'console-window-line',
      child: [],
    };

    const consoleText = Console.itThis.SpecialElements['console-text'];
    consoleText.appendChild(createElement(markup as ElementsDefinitions));
    consoleText.scrollTop = consoleText.scrollHeight;
  }
}

export default Console;
