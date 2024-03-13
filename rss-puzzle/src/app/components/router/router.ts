import App from '../../app';

export class Router {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  logout() {
    this.app.state.setVal('user', { firstName: '', surname: '' });
    this.app.state.save('user');
    this.app.loginPage.show();
  }

  start() {
    this.app.puzzlePage.hide();
    this.app.startPage.show();
    if (this.app.state.isEmptyVal('user')) {
      this.app.loginPage.show();
    }
  }

  startPuzzle() {
    this.app.puzzlePage.show();
    this.app.startPage.hide();
  }
}

export default Router;
