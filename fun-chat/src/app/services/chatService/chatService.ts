import { Console } from '../../utils/console/console';
import StateManager from '../stateManager/stateManager';

class ChatService {
  private states: StateManager;

  constructor(states: StateManager) {
    Console.appendText('Create Chat service');
    this.states = states;
    this.states.chatService = this;
  }
}

export default ChatService;
