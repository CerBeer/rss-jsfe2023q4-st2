import * as state from './states';

class StateManager {
  private currentState;

  constructor() {
    this.currentState = state.states;
  }

  get states() {
    return this.currentState;
  }
}

export default StateManager;
