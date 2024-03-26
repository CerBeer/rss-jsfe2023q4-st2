import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import * as markup from './markup';
import './header.css';
import { Header as HeaderType } from '../../services/stateManager/types';

class Header {
  private states: HeaderType;

  private sellingHTML;

  private specialElements: SpecialElements = {};

  constructor(states: HeaderType) {
    this.states = states;
    this.sellingHTML = createElement(markup.header as ElementsDefinitions, this.specialElements);
    this.states.specialElements = this.specialElements;

    document.body.appendChild(this.sellingHTML);
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }
}

export default Header;
