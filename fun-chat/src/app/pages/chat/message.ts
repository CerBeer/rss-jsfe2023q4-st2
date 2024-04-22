import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as workerTypes from '../../services/worker/types';
import * as markup from './markup';

class Message extends Element {
  private messageID = '';

  constructor(parent: HTMLElement, message: workerTypes.Message, isInput: boolean) {
    super(markup.messageElement as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.specialElements['header-label-left'].innerText = message.from;
    this.specialElements['header-label-right'].innerText = new Date(message.datetime).toLocaleString();
    this.specialElements['box-text'].innerText = message.text;
    this.specialElements['footer-label-left'].innerText = '';
    this.specialElements['footer-label-right'].innerText = this.statusMessageToString(message);
    this.specialElements['dialog-message'].classList.toggle('message-from-companion', isInput);
    this.messageID = message.id;
  }

  statusMessageToString(message: workerTypes.Message) {
    // if (message.from === this._currentCompanion) return message.status.isEdited ? 'изменено' : '';
    if (message.status.isReaded) return 'прочитано';
    if (message.status.isEdited) return 'изменено';
    return 'доставлено';
  }
}

export default Message;
