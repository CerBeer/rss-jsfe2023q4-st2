import { Console } from '../../utils/console/console';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './splash.css';

class Splash extends Element {
  constructor(parent: HTMLElement) {
    super(markup.splash as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    Console.appendText('Create Splash page');
  }
}

export default Splash;
