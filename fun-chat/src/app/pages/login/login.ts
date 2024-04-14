import { Console } from '../../utils/console/console';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './login.css';

class Login extends Element {
  constructor(parent: HTMLElement) {
    super(markup.login as ElementsDefinitions);
    parent.appendChild(this.sellingHTML);
    Console.appendText('Create Login page');
  }
}

export default Login;
