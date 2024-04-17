import { Console } from '../../utils/console/console';
import StateManager from '../../services/stateManager/stateManager';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './about.css';

class About extends Element {
  private states: StateManager;

  constructor(parent: HTMLElement, states: StateManager) {
    super(markup.about as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    this.states = states;
    this.createListeners();
    Console.appendText('Create About page');
  }

  createListeners() {
    const buttonAbout = this.specialElements['about-return'];
    buttonAbout.addEventListener('click', () =>
      this.states.router.goToPage(this.states.router.identifyingPageByStatus())
    );
  }
}

export default About;
