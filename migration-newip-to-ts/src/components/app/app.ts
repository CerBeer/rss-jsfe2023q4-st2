import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller;
    private view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        document.querySelector('.letters')?.addEventListener('click', (e) => this.controller.filterSources(e));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
