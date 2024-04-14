import { Console } from '../../utils/console/console';
import { Element } from '../../utils/element/element';
import { ElementsDefinitions } from '../../utils/element/types';
import * as markup from './markup';
import './login.css';

class Login extends Element {
  constructor() {
    super(markup.login as ElementsDefinitions);
    document.body.appendChild(this.sellingHTML);
    Console.appendText('Create Login page');
  }
}

export default Login;
