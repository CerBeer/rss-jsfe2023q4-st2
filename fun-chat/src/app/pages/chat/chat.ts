import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { PAGE_NAMES } from '../../services/router/enums';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './chat.css';

class Chat extends Element {
  private states: StateManager;

  constructor(parent: HTMLElement, states: StateManager) {
    super(markup.about as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.states = states;
    this.createListeners();
    Console.appendText('Create Chat page');
  }

  createListeners() {
    this.specialElements['chat-info'].addEventListener('click', () => this.states.router.goToPage(PAGE_NAMES.ABOUT));
    this.specialElements['chat-logout'].addEventListener('click', () => this.states.dispatcher.setStateUserLogOut());
  }
}

export default Chat;
