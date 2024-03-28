import { ElementsDefinitions, createElement } from '../utils/elements';

export class AlertMessage {
  constructor(head: string, alert: string, timeout: number) {
    const markup = {
      tag: 'DIV',
      text: ``,
      attributes: {},
      classes: 'alert-window',
      child: [
        {
          tag: 'DIV',
          text: head,
          attributes: {},
          classes: 'alert-window-head',
          child: [],
        },
        {
          tag: 'DIV',
          text: alert,
          attributes: {},
          classes: 'alert-window-alert',
          child: [],
        },
      ],
    };

    const sellingHTML = createElement(markup as ElementsDefinitions);

    document.body.appendChild(sellingHTML);

    setTimeout(() => document.body.removeChild(sellingHTML), timeout);
  }
}

export default AlertMessage;
