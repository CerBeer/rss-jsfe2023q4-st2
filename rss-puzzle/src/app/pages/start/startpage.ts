import { router } from '../../../index';
import { Storage } from '../../components/storage/storage';
import { Definition, createElement } from '../../utils/elements';
import * as markup from './markup';
import './style.css';

class StartPage {
  private page;

  private unamed: { [key: string]: HTMLElement } = {};

  constructor(states: Storage) {
    this.page = createElement(markup.mainPage as Definition, this.unamed);

    const docBody = document.querySelector('body');
    if (docBody === null) return;
    docBody.appendChild(this.page);

    this.unamed.buttonLogOut.addEventListener('click', () => {
      router.logout();
    });

    this.unamed.buttonStart.addEventListener('click', () => {
      router.startPuzzle();
    });

    if (!states.isEmptyVal('user')) {
      const loginUser = states.getVal('user') as { [key: string]: string };
      this.unamed.welcomeMessage.innerText = `Welcome ${loginUser.firstName} ${loginUser.surname}!`;
    }
  }

  setUserName(user: { [key: string]: string }) {
    this.unamed.welcomeMessage.innerText = `Welcome ${user.firstName} ${user.surname}!`;
  }

  hide() {
    this.page.classList.add('page-none');
  }

  show() {
    this.page.classList.remove('page-none');
  }
}

export default StartPage;
