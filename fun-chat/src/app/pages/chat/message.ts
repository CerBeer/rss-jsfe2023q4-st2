import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as workerTypes from '../../services/worker/types';
import * as markup from './markup';

class Message extends Element {
  private _messageID = '';

  private _message: workerTypes.Message;

  private isInput = false;

  constructor(parent: HTMLElement, message: workerTypes.Message, isInput: boolean) {
    super(markup.messageElement as ElementsDefinitions);
    this._messageID = message.id;
    this._message = message;
    this.isInput = isInput;
    parent.appendChild(this.sellingHTML);
    this.specialElements['header-label-left'].innerText = message.from;
    this.specialElements['header-label-right'].innerText = new Date(message.datetime).toLocaleString();
    this.specialElements['box-text'].innerText = message.text;
    this.specialElements['footer-label-left'].innerText = '';
    this.specialElements['footer-label-right'].innerText = this.statusMessageToString(message.status);
    this.specialElements['dialog-message'].classList.toggle('message-from-companion', isInput);
  }

  statusMessageToString(status: workerTypes.MessageStatus) {
    if (this.isInput) return status.isEdited ? 'изменено' : '';
    if (status.isReaded) return 'прочитано';
    if (status.isEdited) return 'изменено';
    if (status.isDelivered) return 'доставлено';
    return 'отправлено';
  }

  get messageID() {
    return this._messageID;
  }

  get message() {
    return this._message;
  }

  setMessgeStatusDelivered() {
    this._message.status.isDelivered = true;
    if (!this.isInput) this.setMessgeStatus('доставлено');
  }

  setMessgeStatusReaded() {
    this._message.status.isReaded = true;
    if (!this.isInput) this.setMessgeStatus('прочитано');
  }

  setMessgeStatusEdited(text: string) {
    this._message.status.isEdited = true;
    this.setMessgeStatus('изменено');
    this._message.text = text;
    this.specialElements['box-text'].innerText = text;
  }

  setMessgeStatus(status: string) {
    this.specialElements['footer-label-right'].innerText = status;
  }
}

export default Message;
