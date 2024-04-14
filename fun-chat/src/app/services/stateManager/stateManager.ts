import { Console } from '../../utils/console/console';
import { Storage } from '../../utils/storage/storage';
import * as state from './states';

class StateManager {
  private _states;

  constructor() {
    this._states = new Storage(sessionStorage, state.states);
    Console.appendText('Create StateManager');
  }

  get states() {
    return this._states;
  }
}

export default StateManager;
