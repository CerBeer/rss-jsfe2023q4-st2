import { ElementsDefinitions, createElement } from '../utils/elements';

export class AlertMessage {
  constructor(alert: string, timeout: number) {
    const markup = {
      tag: 'DIV',
      text: alert,
      attributes: {},
      classes: 'alert-window',
      child: [],
    };

    const sellingHTML = createElement(markup as ElementsDefinitions);

    document.body.appendChild(sellingHTML);

    setTimeout(() => document.body.removeChild(sellingHTML), timeout);
  }
}

export default AlertMessage;
