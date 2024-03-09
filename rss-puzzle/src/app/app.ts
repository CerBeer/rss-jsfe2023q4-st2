class App {
  private controller;

  private view;

  constructor(controller: string, view: string) {
    this.controller = controller;
    this.view = view;
  }

  start() {
    document.querySelector('body')?.addEventListener('click', () => console.log(this.controller, this.view));
  }
}

export default App;
