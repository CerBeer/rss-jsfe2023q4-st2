import { Console } from '../../utils/console/console';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './about.css';

class About extends Element {
  constructor(parent: HTMLElement) {
    super(markup.about as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    Console.appendText('Create About page');
  }
}

export default About;
