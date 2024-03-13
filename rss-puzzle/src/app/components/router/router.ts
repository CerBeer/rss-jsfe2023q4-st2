import { app } from '../../../index';

export class Router {
  logout() {
    app.state.setVal('user', { firstName: '', surname: '' });
    app.state.save('user');
    app.loginPage.show();
  }

  start() {
    if (app.state.isEmptyVal('user')) {
      app.loginPage.show();
    }
  }
}

export default Router;
