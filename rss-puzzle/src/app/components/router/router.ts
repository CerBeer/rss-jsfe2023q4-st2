import App from '../../app';

export class Router {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  login() {
    this.app.startPage.setUserName(this.app.states.getVal('user') as { [key: string]: string });
  }

  logout() {
    this.app.states.resetValues();
    this.app.states.saveAll();
    this.app.states.loadAll();
    this.app.initCurrentStates();
    this.app.puzzlePage.initViewClues();
    this.start();
  }

  start() {
    if (!this.app.dataset.isAllLoaded()) {
      setTimeout(() => this.start(), 500);
      return;
    }
    this.app.currentStateNextRound();
    this.app.puzzlePage.hide();
    this.app.startPage.show();
    if (this.app.states.isEmptyVal('user')) {
      this.app.loginPage.show();
    }
  }

  startPuzzle() {
    this.app.startPage.hide();
    this.app.puzzlePage.show();
    this.app.puzzlePage.setView();
  }
}

export default Router;
